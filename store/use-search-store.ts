// stores/use-search-store.ts
import {create} from 'zustand';

interface SearchStore {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({isSearchOpen: !state.isSearchOpen})),
  openSearch: () => set({isSearchOpen: true}),
  closeSearch: () => set({isSearchOpen: false}),
}));
