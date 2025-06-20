import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

const topRatedProducts = [
  {
    id: 1,
    name: "Vanilla Amber Candle",
    price: 28,
    originalPrice: 35,
    image: "/placeholder.svg?height=300&width=300",
    category: "Candles",
    badge: "5.0 ★",
    rating: 5.0,
    reviews: 127,
  },
  {
    id: 11,
    name: "Rose Absolute",
    price: 35,
    image: "/placeholder.svg?height=300&width=300",
    category: "Scents",
    badge: "4.9 ★",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 14,
    name: "The Art of Slow Living",
    price: 22,
    image: "/placeholder.svg?height=300&width=300",
    category: "Books",
    badge: "4.8 ★",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 10,
    name: "Zen Garden",
    price: 28,
    image: "/placeholder.svg?height=300&width=300",
    category: "Scents",
    badge: "4.9 ★",
    rating: 4.9,
    reviews: 94,
  },
];

const bestSellingProducts = [
  {
    id: 1,
    name: "Vanilla Amber Candle",
    price: 28,
    originalPrice: 35,
    image: "/placeholder.svg?height=300&width=300",
    category: "Candles",
    badge: "Best Seller",
    soldCount: "500+ sold",
  },
  {
    id: 9,
    name: "Citrus Energizer",
    price: 20,
    image: "/placeholder.svg?height=300&width=300",
    category: "Scents",
    badge: "Popular",
    soldCount: "350+ sold",
  },
  {
    id: 18,
    name: "Meditation for Beginners",
    price: 16,
    image: "/placeholder.svg?height=300&width=300",
    category: "Books",
    badge: "Popular",
    soldCount: "400+ sold",
  },
  {
    id: 4,
    name: "Lavender Dreams",
    price: 26,
    image: "/placeholder.svg?height=300&width=300",
    category: "Candles",
    badge: "Trending",
    soldCount: "300+ sold",
  },
];

const featuredProducts = [
  {
    id: 2,
    name: "Sandalwood Serenity",
    price: 32,
    image: "/placeholder.svg?height=300&width=300",
    category: "Candles",
    badge: "Limited",
  },
  {
    id: 7,
    name: "Lavender Dreams Scent",
    price: 22,
    image: "/placeholder.svg?height=300&width=300",
    category: "Scents",
    badge: "New",
  },
  {
    id: 13,
    name: "Mindful Living Book",
    price: 18,
    image: "/placeholder.svg?height=300&width=300",
    category: "Books",
    badge: "Featured",
  },
  {
    id: 6,
    name: "Rose Garden Candle",
    price: 34,
    image: "/placeholder.svg?height=300&width=300",
    category: "Candles",
    badge: "Premium",
  },
];

function ProductCard({ product }: { product: any }) {
  const getProductUrl = () => {
    const category = product.category.toLowerCase();
    return `/products/${category}/${product.id}`;
  };

  return (
    <Link href={getProductUrl()}>
      <Card className="group card-hover bg-warm-white border-soft-taupe/20 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Badge
              className="absolute top-3 left-3 bg-muted-gold/90 text-warm-white"
              variant="secondary"
            >
              {product.badge}
            </Badge>
          </div>

          <div className="p-4 space-y-3">
            <div className="text-sm text-sage-green font-medium">
              {product.category}
            </div>
            <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
              {product.name}
            </h3>

            {product.rating && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-gold">★★★★★</span>
                <span className="text-charcoal-gray/70">
                  ({product.reviews} reviews)
                </span>
              </div>
            )}

            {product.soldCount && (
              <div className="text-sm text-charcoal-gray/70">
                {product.soldCount}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-charcoal-gray">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-charcoal-gray/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Button className="w-full btn-accent">View Product</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function TabbedProducts() {
  return (
    <section className="py-16 bg-creamy-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Discover Our Products
          </h2>
          <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
            Explore our carefully curated selection of top-rated, best-selling,
            and featured products.
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-warm-white max-w-md mx-auto mb-8 ">
            <TabsTrigger
              value="top-rated"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white"
            >
              Top Rated
            </TabsTrigger>
            <TabsTrigger
              value="best-selling"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white"
            >
              Best Selling
            </TabsTrigger>
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white"
            >
              Featured
            </TabsTrigger>
          </TabsList>

          <div className="border-t border-muted-gold pt-8">
            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-rated">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="best-selling">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" className="btn-secondary">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
