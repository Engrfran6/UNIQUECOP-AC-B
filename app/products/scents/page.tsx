import LoadingSpinner from "@/components/LoadingSpinner";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import { Suspense } from "react";

const scentProducts = [
  {
    id: 7,
    name: "Lavender Dreams Scent",
    price: 22,
    image: "/scents/s1.webp?height=400&width=400",
    category: "Scents",
    badge: "New",
    description: "Pure lavender essential oil for aromatherapy and relaxation",
    type: "Essential Oil",
    volume: "15ml",
    notes: "Lavender, Bergamot",
  },
  {
    id: 8,
    name: "Eucalyptus Mint",
    price: 25,
    image: "/scents/s2.webp?height=400&width=400",
    category: "Scents",
    description:
      "Refreshing eucalyptus with cooling mint for clarity and focus",
    type: "Essential Oil Blend",
    volume: "15ml",
    notes: "Eucalyptus, Peppermint, Spearmint",
  },
  {
    id: 9,
    name: "Citrus Energizer",
    price: 20,
    image: "/scents/s3.webp?height=400&width=400",
    category: "Scents",
    badge: "Popular",
    description: "Uplifting citrus blend to boost energy and mood",
    type: "Essential Oil Blend",
    volume: "15ml",
    notes: "Orange, Lemon, Grapefruit",
  },
  {
    id: 10,
    name: "Zen Garden",
    price: 28,
    image: "/scents/s4.webp?height=400&width=400",
    category: "Scents",
    description: "Meditative blend of sandalwood and frankincense",
    type: "Premium Blend",
    volume: "20ml",
    notes: "Sandalwood, Frankincense, Cedarwood",
  },
  {
    id: 11,
    name: "Rose Absolute",
    price: 35,
    image: "/scents/s5.webp?height=400&width=400",
    category: "Scents",
    badge: "Luxury",
    description: "Pure rose absolute for romantic and luxurious ambiance",
    type: "Absolute Oil",
    volume: "10ml",
    notes: "Bulgarian Rose, Geranium",
  },
  {
    id: 12,
    name: "Forest Therapy",
    price: 24,
    image: "/scents/s6.webp?height=400&width=400",
    category: "Scents",
    description:
      "Grounding forest scents for stress relief and connection to nature",
    type: "Essential Oil Blend",
    volume: "15ml",
    notes: "Pine, Fir, Juniper",
  },
];

export default function ScentsPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-sage-green/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Premium Scents
            </h1>
            <p className="text-lg text-charcoal-gray/80 mb-8">
              Our carefully curated collection of essential oils and fragrance
              blends are sourced from the finest ingredients around the world.
              Each scent is designed to transform your space and elevate your
              mood.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-sage-green">Pure</div>
                <div className="text-sm text-charcoal-gray/70">
                  Essential Oils
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-sage-green">
                  Therapeutic
                </div>
                <div className="text-sm text-charcoal-gray/70">
                  Grade Quality
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-sage-green">
                  Ethically
                </div>
                <div className="text-sm text-charcoal-gray/70">Sourced</div>
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
              <ProductFilters category="scents" />
            </aside>
            <main className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-charcoal-gray">
                  All Scents ({scentProducts.length})
                </h2>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <ProductGrid products={scentProducts} />
              </Suspense>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
