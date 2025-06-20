import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Vanilla Amber Candle",
    price: 28,
    originalPrice: 35,
    image: "/candles/c1.webp?height=300&width=300",
    category: "Candles",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Lavender Dreams Scent",
    price: 22,
    image: "/candles/c2.webp?height=300&width=300",
    category: "Scents",
    badge: "New",
  },
  {
    id: 3,
    name: "Mindful Living Book",
    price: 18,
    image: "/candles/c3.webp?height=300&width=300",
    category: "Books",
    badge: "Featured",
  },
  {
    id: 4,
    name: "Sandalwood Serenity",
    price: 32,
    image: "/candles/c4.webp?height=300&width=300",
    category: "Candles",
    badge: "Limited",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-creamy-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Featured Collection
          </h2>
          <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
            Discover our most loved products, carefully crafted to bring warmth
            and tranquility to your space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group card-hover bg-warm-white border-soft-taupe/20"
            >
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
                  <button className="w-full btn-accent">Add to Cart</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" className="!btn-secondary">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
