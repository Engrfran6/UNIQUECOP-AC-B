import {db} from "@/lib/firebase";
import {AdminProduct} from "@/lib/types";
import {collection, getDocs} from "firebase/firestore";

export const KNOWN_CATEGORIES = ["candles", "wax", "books", "collections"] as const;
export type ProductCategory = (typeof KNOWN_CATEGORIES)[number];

export type ProductCategoryType = {
  [key in ProductCategory]?: AdminProduct[];
} & {
  [key: string]: AdminProduct[] | undefined;
};

export async function fetchAllAndGroupedProducts(): Promise<{
  allProducts: AdminProduct[];
  groupedProducts: ProductCategoryType;
  candles: AdminProduct[];
  books: AdminProduct[];
  wax: AdminProduct[];
  collections: AdminProduct[];
}> {
  const allProducts: AdminProduct[] = [];
  const groupedProducts: ProductCategoryType = {};

  for (const category of KNOWN_CATEGORIES) {
    const snapshot = await getDocs(collection(db, category));

    const items = snapshot.docs.map((doc) => {
      const data = doc.data();
      const product: AdminProduct = {
        id: doc.id,
        ...data,
        category: data.category || category,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      } as AdminProduct;
      allProducts.push(product);
      return product;
    });

    groupedProducts[category] = items;
  }

  return {
    allProducts,
    groupedProducts,
    candles: groupedProducts["candles"] ?? [],
    books: groupedProducts["books"] ?? [],
    wax: groupedProducts["wax"] ?? [],
    collections: groupedProducts["collections"] ?? [],
  };
}
