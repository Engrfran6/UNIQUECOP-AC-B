'use client';

import CategoryHeader from '@/components/CategoryHeader';
import ProductGrid from '@/components/ProductGrid';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {allProducts} from '@/data/data';
import {headerData} from '@/data/headerdata';
import {Filter, Grid, List, Search} from 'lucide-react';
import {useMemo, useState} from 'react';

// Sample products data - in a real app, this would come from your database
// const products = [
//   // Candles
//   {
//     id: '1',
//     name: 'Vanilla Dreams Candle',
//     price: 24.99,
//     originalPrice: 29.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'candles',
//     subcategory: 'scented',
//     rating: 4.8,
//     reviews: 124,
//     inStock: true,
//     featured: true,
//     tags: ['vanilla', 'relaxing', 'bedroom'],
//     description: 'A soothing vanilla-scented candle perfect for relaxation',
//   },
//   {
//     id: '2',
//     name: 'Ocean Breeze Candle',
//     price: 22.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'candles',
//     subcategory: 'scented',
//     rating: 4.6,
//     reviews: 89,
//     inStock: true,
//     tags: ['ocean', 'fresh', 'bathroom'],
//     description: 'Fresh ocean scent that brings the seaside to your home',
//   },
//   {
//     id: '3',
//     name: 'Lavender Serenity Candle',
//     price: 26.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'candles',
//     subcategory: 'aromatherapy',
//     rating: 4.9,
//     reviews: 156,
//     inStock: true,
//     featured: true,
//     tags: ['lavender', 'aromatherapy', 'sleep'],
//     description: 'Calming lavender candle for better sleep and relaxation',
//   },
//   {
//     id: '4',
//     name: 'Citrus Burst Candle',
//     price: 23.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'candles',
//     subcategory: 'energizing',
//     rating: 4.5,
//     reviews: 67,
//     inStock: true,
//     tags: ['citrus', 'energizing', 'kitchen'],
//     description: 'Energizing citrus blend to brighten your day',
//   },
//   {
//     id: '5',
//     name: 'Unscented Pillar Candle',
//     price: 18.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'candles',
//     subcategory: 'unscented',
//     rating: 4.3,
//     reviews: 45,
//     inStock: true,
//     tags: ['unscented', 'pillar', 'dining'],
//     description: 'Classic unscented pillar candle for ambient lighting',
//   },

//   // Wax Melts
//   {
//     id: '6',
//     name: 'Apple Cinnamon Wax Melts',
//     price: 12.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'wax-melts',
//     subcategory: 'seasonal',
//     rating: 4.7,
//     reviews: 98,
//     inStock: true,
//     featured: true,
//     tags: ['apple', 'cinnamon', 'fall', 'seasonal'],
//     description: 'Warm apple cinnamon scent perfect for autumn',
//   },
//   {
//     id: '7',
//     name: 'Rose Garden Wax Melts',
//     price: 14.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'wax-melts',
//     subcategory: 'floral',
//     rating: 4.4,
//     reviews: 72,
//     inStock: true,
//     tags: ['rose', 'floral', 'romantic'],
//     description: 'Elegant rose scent for a romantic atmosphere',
//   },
//   {
//     id: '8',
//     name: 'Fresh Linen Wax Melts',
//     price: 11.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'wax-melts',
//     subcategory: 'clean',
//     rating: 4.6,
//     reviews: 83,
//     inStock: true,
//     tags: ['linen', 'clean', 'fresh'],
//     description: 'Clean, fresh linen scent for any room',
//   },

//   // Books
//   {
//     id: '9',
//     name: 'The Art of Candle Making',
//     price: 29.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'books',
//     subcategory: 'crafts',
//     rating: 4.8,
//     reviews: 145,
//     inStock: true,
//     featured: true,
//     tags: ['crafts', 'diy', 'candle-making'],
//     description: 'Complete guide to making your own candles at home',
//   },
//   {
//     id: '10',
//     name: 'Aromatherapy Essentials',
//     price: 24.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'books',
//     subcategory: 'wellness',
//     rating: 4.5,
//     reviews: 89,
//     inStock: true,
//     tags: ['aromatherapy', 'wellness', 'health'],
//     description: 'Learn the healing power of essential oils and scents',
//   },
//   {
//     id: '11',
//     name: 'Home Decor with Candles',
//     price: 22.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'books',
//     subcategory: 'decor',
//     rating: 4.3,
//     reviews: 56,
//     inStock: false,
//     tags: ['decor', 'interior-design', 'styling'],
//     description: 'Creative ways to decorate your home with candles',
//   },
//   {
//     id: '12',
//     name: 'Meditation and Mindfulness',
//     price: 19.99,
//     image: '/placeholder.svg?height=300&width=300',
//     category: 'books',
//     subcategory: 'wellness',
//     rating: 4.7,
//     reviews: 112,
//     inStock: true,
//     tags: ['meditation', 'mindfulness', 'wellness'],
//     description: 'Guide to meditation practices with candle rituals',
//   },
// ];

const products = [
  ...allProducts.books,
  ...allProducts.candles,
  ...allProducts.wax,
  ...allProducts.collections,
];

const categories = [
  {id: 'all', name: 'All Products', count: products.length},
  {
    id: 'candles',
    name: 'Candles',
    count: allProducts.candles.length,
  },
  {
    id: 'wax-melts',
    name: 'Wax Melts',
    count: allProducts.wax.length,
  },
  {id: 'books', name: 'Books', count: allProducts.books.length},
  {
    id: 'collections',
    name: 'Collections',
    count: allProducts.collections.length,
  },
];

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    inStock: false,
    rating: 0,
    tags: [] as string[],
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.tags.some((tag) => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Filter by stock status
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter((product) =>
        filters.tags.some((tag) => product?.tags.includes(tag))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you'd sort by creation date
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a?.featured && !b?.featured) return -1;
          if (!a?.featured && b?.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <CategoryHeader {...headerData.allProducts} />

      <div className="container mx-auto px-4 py-12">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/60" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-creamy-beige border-soft-taupe"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border border-soft-taupe rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none">
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none">
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                {/* <ProductFilters
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  products={products}
                /> */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80">
            <Card>
              <CardContent className="p-6">
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-muted-gold mb-4 text-sm">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-[10px] font-bold transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-sage-green text-warm-white'
                            : 'hover:bg-creamy-beige text-charcoal-gray'
                        }`}>
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {category?.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* <ProductFilters
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  products={products}
                /> */}
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-charcoal-gray">
                  {filteredProducts.length} Products
                </h2>
                {searchQuery && (
                  <p className="text-charcoal-gray/60">Results for "{searchQuery}"</p>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} viewMode={viewMode} />
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-creamy-beige rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-charcoal-gray/60" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-gray mb-2">No products found</h3>
                <p className="text-charcoal-gray/60 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilters({
                      priceRange: [0, 100],
                      inStock: false,
                      rating: 0,
                      tags: [],
                    });
                  }}
                  variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
