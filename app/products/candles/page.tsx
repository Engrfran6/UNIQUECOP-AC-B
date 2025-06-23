'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import {Pagination} from '@/components/Pagination';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import {SearchInput} from '@/components/SearchInput';
import {allProducts} from '@/data';
import {usePagination} from '@/hooks/use-pagination';
import {useProductFilter} from '@/hooks/use-products-filter';
import {useSearchStore} from '@/store/use-search-store';
import {Suspense, useMemo} from 'react';

export default function CandlesPage() {
  const {isSearchOpen, closeSearch} = useSearchStore();
  const initialProducts = useMemo(() => allProducts.candles, []);

  const {filteredProducts, filters, updateFilters, resetFilters, isSearching, updateSearchQuery} =
    useProductFilter({
      initialProducts,
      filterConfig: {
        priceField: 'price',
        filterFields: {
          scents: 'scent',
          sizes: 'size',
          burnTime: 'burnTime',
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

      <section className="bg-creamy-beige py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Handcrafted Candles
            </h1>
            <p className="text-lg text-charcoal-gray/80 mb-8">
              Each candle is lovingly hand-poured using premium soy wax and natural fragrances. Our
              artisanal process ensures a clean, long-lasting burn that fills your space with
              beautiful scents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-gold">100%</div>
                <div className="text-sm text-charcoal-gray/70">Natural Soy Wax</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-gold">45-60</div>
                <div className="text-sm text-charcoal-gray/70">Hours Burn Time</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-gold">Hand</div>
                <div className="text-sm text-charcoal-gray/70">Poured & Crafted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64">
              <ProductFilters
                category="candles"
                priceRange={filters.priceRange}
                selectedOptions={filters.selectedOptions}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
              />
            </aside>
            <main className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-charcoal-gray">
                  All Candles ({filteredProducts.length})
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
