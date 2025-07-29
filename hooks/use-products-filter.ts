// hooks/use-products-filter.ts
import {useCallback, useEffect, useMemo, useState} from 'react';

export interface FilterOptions {
  priceRange: [number, number];
  selectedOptions: Record<string, string[]>;
  searchQuery: string;
}

interface UseProductFilterProps<T> {
  initialProducts: T[];
  filterConfig: {
    priceField: keyof T;
    filterFields: Record<string, keyof T>;
    searchFields?: (keyof T)[];
  };
  debounceDelay?: number;
}

export function useProductFilter<T>({
  initialProducts,
  filterConfig,
  debounceDelay = 300,
}: UseProductFilterProps<T>) {
  const priceValues = useMemo(() => {
    const prices = initialProducts.map((product) => Number(product[filterConfig.priceField]));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max] as [number, number];
  }, [initialProducts, filterConfig.priceField]);

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: priceValues,
    selectedOptions: {},
    searchQuery: '',
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: priceValues,
    }));
  }, [priceValues]);

  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = [...initialProducts];

    // Apply price filter
    results = results.filter(
      (product) =>
        Number(product[filterConfig.priceField]) >= filters.priceRange[0] &&
        Number(product[filterConfig.priceField]) <= filters.priceRange[1]
    );

    // Apply option filters
    Object.entries(filters.selectedOptions).forEach(([filterType, options]) => {
      if (options.length > 0 && filterConfig.filterFields[filterType]) {
        const fieldName = filterConfig.filterFields[filterType];
        results = results.filter((product) => options.includes(String(product[fieldName])));
      }
    });

    // Apply search filter if search fields are configured
    if (filterConfig.searchFields && filters.searchQuery.trim()) {
      const lowerCaseQuery = filters.searchQuery.toLowerCase();
      results = results.filter((product) =>
        filterConfig.searchFields!.some((key) => {
          const value = product[key];
          return value && typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery);
        })
      );
    }

    return results;
  }, [initialProducts, filters, filterConfig]);

  const updateSearchQuery = useCallback(
    (query: string) => {
      setIsSearching(true);
      setFilters((prev) => ({...prev, searchQuery: query}));

      // Clear the searching state after debounce delay
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, debounceDelay);

      return () => clearTimeout(timer);
    },
    [debounceDelay]
  );

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100],
      selectedOptions: {},
      searchQuery: '',
    });
  };

  return {
    filteredProducts,
    filters,
    isSearching,
    updateFilters,
    updateSearchQuery,
    resetFilters,
  };
}
