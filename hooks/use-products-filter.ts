// hooks/useProductFilter.ts
import {useMemo, useState} from 'react';

export interface FilterOptions {
  priceRange: [number, number];
  selectedOptions: Record<string, string[]>;
}

interface UseProductFilterProps<T> {
  initialProducts: T[];
  filterConfig: {
    priceField: keyof T;
    filterFields: Record<string, keyof T>;
  };
}

export function useProductFilter<T>({initialProducts, filterConfig}: UseProductFilterProps<T>) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 100],
    selectedOptions: {},
  });

  const filteredProducts = useMemo(() => {
    let results = [...initialProducts];

    results = results.filter(
      (product) =>
        Number(product[filterConfig.priceField]) >= filters.priceRange[0] &&
        Number(product[filterConfig.priceField]) <= filters.priceRange[1]
    );

    Object.entries(filters.selectedOptions).forEach(([filterType, options]) => {
      if (options.length > 0 && filterConfig.filterFields[filterType]) {
        const fieldName = filterConfig.filterFields[filterType];
        results = results.filter((product) => options.includes(String(product[fieldName])));
      }
    });

    return results;
  }, [initialProducts, filters, filterConfig]);

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
    });
  };

  return {
    filteredProducts,
    filters,
    updateFilters,
    resetFilters,
  };
}
