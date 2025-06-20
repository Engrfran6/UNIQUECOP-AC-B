import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Handmade Candles",
    description:
      "Artisanal candles crafted with premium wax and natural fragrances",
    image: "/candles/c5.webp?height=400&width=600",
    href: "/products/candles",
    color: "muted-gold",
  },
  {
    name: "Premium Scents",
    description: "Carefully curated fragrances to transform your space",
    image: "/scents/s6.webp?height=400&width=600",
    href: "/products/scents",
    color: "dusty-rose",
  },
  {
    name: "Curated Books",
    description: "Inspiring reads for mindful living and personal growth",
    image: "/books/b5.webp?height=400&width=600",
    href: "/products/books",
    color: "sage-green",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Explore Our Collections
          </h2>
          <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
            Each collection is thoughtfully curated to enhance your daily
            rituals and create moments of peace.
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="space-y-4">
                  <h3 className="font-playfair text-3xl font-bold text-charcoal-gray">
                    {category.name}
                  </h3>
                  <p className="text-lg text-charcoal-gray/80">
                    {category.description}
                  </p>
                </div>
                <Link href={category.href}>
                  <button className="btn-accent">Explore Collection</button>
                </Link>
              </div>

              <div
                className={`relative ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
