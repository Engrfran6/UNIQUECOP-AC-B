"use client";

import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {headerData} from "@/data/headerdata";
import {useProducts} from "@/hooks/use-products";
import {Filter, Grid, List, Search} from "lucide-react";
import {useMemo, useState} from "react";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    priceRange: [0, Infinity],
    inStock: false,
    rating: 0,
    tags: [] as string[],
  });

  const {data, isLoading, error} = useProducts();

  const categories = [
    {
      id: "all",
      name: "All Products",
      count: data?.allProducts?.length,
    },
    {
      id: "candles",
      name: "Candles",
      count: data?.candles?.length,
    },
    {
      id: "wax",
      name: "Wax Melts",
      count: data?.wax?.length,
    },
    {
      id: "books",
      name: "Books",
      count: data?.books?.length,
    },
    {
      id: "collections",
      name: "Collections",
      count: data?.collections?.length,
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!data?.allProducts) return [];

    // start with filtered array copy
    let filtered = [...data.allProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered?.filter(
        (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.tags.some((tag) => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered?.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Filter by stock status
    if (filters.inStock) {
      filtered = filtered?.filter((product) => product.inStock);
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered?.filter((product) => product.rating >= filters.rating);
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered?.filter((product) =>
        filters.tags.some((tag) => product?.tags.includes(tag))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered?.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered?.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered?.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered?.sort((a, b) => {
          const aTime =
            typeof a.createdAt === "number" ? a.createdAt : new Date(a.createdAt ?? 0).getTime();
          const bTime =
            typeof b.createdAt === "number" ? b.createdAt : new Date(b.createdAt ?? 0).getTime();
          return bTime - aTime;
        });
        break;
      case "featured":
      default:
        filtered?.sort((a, b) => {
          if (a?.featured && !b?.featured) return -1;
          if (!a?.featured && b?.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, filters, data]);

  if (!filteredProducts) return;

  // const handleFilterChange = (newFilters: typeof filters) => {
  //   setFilters(newFilters);
  // };

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
              <SelectContent className="bg-sage-green text-warm-white rounded">
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
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none">
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
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

        <div className="flex flex-col gap-x-8">
          {/* Desktop Filters */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full mb-4">
            <TabsList className="flex flex-wrap justify-start gap-2 bg-creamy-beige h-max p-2 rounded-lg shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-xs font-medium px-3 py-1 rounded-md border border-soft-taupe data-[state=active]:bg-sage-green data-[state=active]:text-white">
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category?.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

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
            {data?.allProducts?.length! > 0 ? (
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
                    setSearchQuery("");
                    setSelectedCategory("all");
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
