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
    id: 13,
    name: 'Mindful Living Book',
    price: 18,
    image: '/books/b1.webp?height=400&width=400',
    category: 'Books',
    badge: 'Featured',
    description: 'A comprehensive guide to incorporating mindfulness into daily life',
    author: 'Sarah Chen',
    pages: 240,
    genre: 'Self-Help',
  },
  {
    id: 14,
    name: 'The Art of Slow Living',
    price: 22,
    image: '/books/b6.webp?height=400&width=400',
    category: 'Books',
    badge: 'Bestseller',
    description: "Discover the beauty of slowing down and savoring life's simple pleasures",
    author: 'Emma Thompson',
    pages: 280,
    genre: 'Lifestyle',
  },
  {
    id: 15,
    name: 'Aromatherapy Essentials',
    price: 25,
    image: '/books/b2.webp?height=400&width=400',
    category: 'Books',
    description: 'Complete guide to essential oils and their therapeutic benefits',
    author: 'Dr. Michael Green',
    pages: 320,
    genre: 'Health & Wellness',
  },
  {
    id: 16,
    name: 'Creating Sacred Spaces',
    price: 20,
    image: '/books/b3.webp?height=400&width=400',
    category: 'Books',
    badge: 'New',
    description: 'Transform your home into a sanctuary of peace and tranquility',
    author: 'Luna Martinez',
    pages: 200,
    genre: 'Home & Design',
  },
  {
    id: 17,
    name: "The Candle Maker's Guide",
    price: 28,
    image: '/books/b4.webp?height=400&width=400',
    category: 'Books',
    description: 'Learn the art of candle making from basic techniques to advanced designs',
    author: 'James Wilson',
    pages: 350,
    genre: 'Crafts & Hobbies',
  },
  {
    id: 18,
    name: 'Meditation for Beginners',
    price: 16,
    image: '/books/b5.webp?height=400&width=400',
    category: 'Books',
    badge: 'Popular',
    description: 'Simple techniques to start your meditation journey',
    author: 'Zen Master Kai',
    pages: 180,
    genre: 'Spirituality',
  },
];

export default function BooksPage() {
  const {filteredProducts, filters, updateFilters, resetFilters} = useProductFilter({
    initialProducts,
    filterConfig: {
      priceField: 'price',
      filterFields: {
        genres: 'genre',
        authors: 'author',
        pages: 'pages',
      },
    },
  });

  const {currentItems, currentPage, totalPages, goToPage} = usePagination({
    items: filteredProducts,
    itemsPerPage: 10,
  });
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-dusty-rose/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Curated Books
            </h1>
            <p className="text-lg text-charcoal-gray/80 mb-8">
              Thoughtfully selected books that inspire mindful living, creativity, and personal
              growth. Each title complements our philosophy of creating peaceful, intentional
              spaces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-dusty-rose">Mindful</div>
                <div className="text-sm text-charcoal-gray/70">Living Guides</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-dusty-rose">Creative</div>
                <div className="text-sm text-charcoal-gray/70">Inspiration</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-dusty-rose">Wellness</div>
                <div className="text-sm text-charcoal-gray/70">& Self-Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64">
              <ProductFilters
                category="books"
                priceRange={filters.priceRange}
                selectedOptions={filters.selectedOptions}
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
              />
            </aside>
            <main className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-charcoal-gray">
                  All Books ({filteredProducts.length})
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
