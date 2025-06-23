// stores/use-cart-store.ts
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

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

      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items
            .map((i) => (i.id === id ? {...i, quantity} : i))
            .filter((i) => i.quantity > 0);

          return {
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
          };
        }),

      clearCart: () => set({items: [], total: 0}),
    }),
    {
      name: 'cart-storage',
    }
  )
);
