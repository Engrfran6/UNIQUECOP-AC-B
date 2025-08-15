import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useProducts} from "@/hooks/use-products";
import Link from "next/link";
import {useMemo} from "react";
import {TabbedProductCard} from "./TabbedProductsCard";

export default function TabbedProducts() {
  const {data, isLoading, error} = useProducts();

  const topRatedProducts = useMemo(() => {
    return data?.allProducts.filter((product) => product.topRated).slice(0, 4);
  }, [data]);

  const bestSellingProducts = useMemo(() => {
    return data?.allProducts.filter((product) => product.bestSelling).slice(0, 4);
  }, [data]);

  const featuredProducts = useMemo(() => {
    return data?.allProducts.filter((product) => product.featured).slice(0, 4);
  }, [data]);

  return (
    <section className="py-16 bg-creamy-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Discover Our Products
          </h2>
          <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
            Discover our most loved selection of top-rated, best-selling, and featured, carefully
            crafted to bring warmth and tranquility to your space.
          </p>
        </div>

        <Tabs defaultValue="top-rated" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-warm-white max-w-md mx-auto mb-8 ">
            <TabsTrigger
              value="top-rated"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
              Top Rated
            </TabsTrigger>
            <TabsTrigger
              value="best-selling"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
              Best Selling
            </TabsTrigger>
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
              Featured
            </TabsTrigger>
          </TabsList>

          <div className="border-t border-muted-gold pt-8">
            <TabsContent value="featured">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts?.map((product) => (
                  <TabbedProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-rated">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topRatedProducts?.map((product) => (
                  <TabbedProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="best-selling">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestSellingProducts?.map((product) => (
                  <TabbedProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="text-center mt-12">
          <Link href="/products/shop">
            <Button variant="outline" className="btn-secondary">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
