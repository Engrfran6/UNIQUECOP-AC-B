'use client';

import CategoryHeader from '@/components/CategoryHeader';
import LoadingSpinner from '@/components/LoadingSpinner';
import {Pagination} from '@/components/Pagination';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import {SearchInput} from '@/components/SearchInput';

import {allProducts} from '@/data/data';
import {headerData} from '@/data/headerdata';

import {usePagination} from '@/hooks/use-pagination';
import {useProductFilter} from '@/hooks/use-products-filter';
import {useSearchStore} from '@/store/use-search-store';
import {Suspense, useMemo} from 'react';

export default function ScentsPage() {
  const {isSearchOpen, closeSearch} = useSearchStore();
  const initialProducts = useMemo(() => allProducts.scents, []);
  const {filteredProducts, filters, updateFilters, resetFilters, isSearching, updateSearchQuery} =
    useProductFilter({
      initialProducts,
      filterConfig: {
        priceField: 'price',
        filterFields: {
          types: 'type',
          volumes: 'volume',
          notes: 'notes',
        },
        searchFields: ['name', 'description', 'category'],
      },
    });

  const {currentItems, currentPage, totalPages, goToPage} = usePagination({
    items: filteredProducts,
    itemsPerPage: 10,
  });

  if (isSearching && filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
        <p className="text-charcoal-gray mt-4">No products found for "{filters.searchQuery}"</p>
      </div>
    );
  }

  const handleCloseSearch = () => {
    updateSearchQuery('');
    closeSearch();
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {isSearchOpen && (
        <SearchInput
          searchQuery={filters.searchQuery}
          updateSearchQuery={updateSearchQuery}
          onClose={handleCloseSearch}
        />
      )}
      <CategoryHeader {...headerData.scents} />

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64">
              <ProductFilters
                category="scents"
                priceRange={filters.priceRange}
                selectedOptions={filters.selectedOptions}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
              />
            </aside>
            <main className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-charcoal-gray">
                  All Scents ({filteredProducts.length})
                </h2>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <ProductGrid products={currentItems} />
              </Suspense>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
