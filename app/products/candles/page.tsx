'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import {Pagination} from '@/components/Pagination';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import {usePagination} from '@/hooks/use-pagination';
import {useProductFilter} from '@/hooks/use-products-filter';
import {Suspense} from 'react';

const initialProducts = [
  {
    id: 1,
    name: 'Vanilla Amber Candle',
    price: 28,
    originalPrice: 35,
    image: '/candles/c8.webp?height=400&width=400',
    category: 'Candles',
    badge: 'Best Seller',
    description: 'A warm blend of vanilla and amber creates the perfect cozy atmosphere',
    scent: 'Vanilla & Amber',
    burnTime: '45-50 hours',
    size: '8 oz',
  },
  {
    id: 2,
    name: 'Sandalwood Serenity',
    price: 32,
    image: '/candles/c9.webp?height=400&width=400',
    category: 'Candles',
    badge: 'Limited',
    description: 'Earthy sandalwood with hints of cedar for deep relaxation',
    scent: 'Sandalwood & Cedar',
    burnTime: '50-55 hours',
    size: '9 oz',
  },
  {
    id: 3,
    name: 'Citrus Burst Candle',
    price: 24,
    image: '/candles/c7.webp?height=400&width=400',
    category: 'Candles',
    badge: 'New',
    description: 'Energizing blend of orange, lemon, and grapefruit',
    scent: 'Citrus Medley',
    burnTime: '40-45 hours',
    size: '7 oz',
  },
  {
    id: 4,
    name: 'Lavender Dreams',
    price: 26,
    image: '/candles/c10.webp?height=400&width=400',
    category: 'Candles',
    description: 'Pure lavender for ultimate relaxation and peaceful sleep',
    scent: 'French Lavender',
    burnTime: '45-50 hours',
    size: '8 oz',
  },
  {
    id: 5,
    name: 'Forest Pine Candle',
    price: 30,
    image: '/candles/c5.webp?height=400&width=400',
    category: 'Candles',
    description: 'Fresh pine and eucalyptus bring the outdoors inside',
    scent: 'Pine & Eucalyptus',
    burnTime: '48-52 hours',
    size: '8.5 oz',
  },
  {
    id: 6,
    name: 'Rose Garden Candle',
    price: 34,
    image: '/candles/c1.webp?height=400&width=400',
    category: 'Candles',
    badge: 'Premium',
    description: 'Delicate rose petals with a touch of jasmine',
    scent: 'Rose & Jasmine',
    burnTime: '55-60 hours',
    size: '10 oz',
  },
];

export default function CandlesPage() {
  const {filteredProducts, filters, updateFilters, resetFilters} = useProductFilter({
    initialProducts,
    filterConfig: {
      priceField: 'price',
      filterFields: {
        scents: 'scent',
        sizes: 'size',
        burnTime: 'burnTime',
      },
    },
  });

  const {currentItems, currentPage, totalPages, goToPage} = usePagination({
    items: filteredProducts,
    itemsPerPage: 10,
  });

  return (
    <div className="min-h-screen bg-warm-white">
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
