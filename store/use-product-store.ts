import {fetchAllAndGroupedProducts, ProductCategoryType} from "@/lib/products";
import {AdminProduct} from "@/lib/types";
import {create} from "zustand";

interface ProductStore {
  product: AdminProduct | null;
  products: AdminProduct[];
  groupedProducts: ProductCategoryType;
  loading: boolean;
  fetchProducts: () => Promise<void>;
  setProduct: (product: AdminProduct) => void;
  candles: AdminProduct[];
  books: AdminProduct[];
  wax: AdminProduct[];
  collections: AdminProduct[];
}

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  products: [],
  groupedProducts: {},
  candles: [],
  books: [],
  wax: [],
  collections: [],
  loading: false,

  setProduct: (product) => {
    set({product});
  },

  fetchProducts: async () => {
    set({loading: true});
    try {
      const {allProducts, groupedProducts, candles, books, wax, collections} =
        await fetchAllAndGroupedProducts();

      set({
        products: allProducts,
        groupedProducts,
        candles,
        books,
        wax,
        collections,
        loading: false,
      });
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
      set({loading: false});
    }
  },
}));
