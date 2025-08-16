import {db} from "@/lib/firebase";
import {AdminProduct} from "@/lib/types";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

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
    const q = query(collection(db, category), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

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

  // 🟡 Ensure allProducts are sorted by createdAt descending
  allProducts.sort((a, b) => {
    const aTime =
      a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt!).getTime();
    const bTime =
      b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt!).getTime();
    return bTime - aTime;
  });

  return {
    allProducts,
    groupedProducts,
    candles: groupedProducts["candles"] ?? [],
    books: groupedProducts["books"] ?? [],
    wax: groupedProducts["wax"] ?? [],
    collections: groupedProducts["collections"] ?? [],
  };
}
