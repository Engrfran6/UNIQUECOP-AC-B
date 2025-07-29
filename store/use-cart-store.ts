// stores/use-cart-store.ts
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  setPendingClearCart: (pending: boolean) => void;
  pendingClearCart?: boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      pendingClearCart: false,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            const updatedItems = state.items.map((i) =>
              i.id === item.id ? {...i, quantity: i.quantity + 1} : i
            );
            return {
              items: updatedItems,
              total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
            };
          }

          const newItems = [...state.items, {...item, quantity: 1}];
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        }),

      updateQuantity: (id: number, quantity: number) =>
        set((state) => {
          const newItems = state.items
            .map((i) => (i.id === id ? {...i, quantity} : i))
            .filter((i) => i.quantity > 0);

          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        }),

      clearCart: () => set({items: [], total: 0, pendingClearCart: false}),
      setPendingClearCart: (pending: boolean) =>
        set((state) => ({...state, pendingClearCart: pending})),
    }),
    {
      name: 'cart-storage',
    }
  )
);
