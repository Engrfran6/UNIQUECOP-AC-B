import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Handmade Candles",
    description:
      "Our artisanal candles are crafted with 100% natural soy wax, premium essential oils, and hand-poured with care. Each candle burns cleanly for 50+ hours, filling your space with subtle, long-lasting fragrances. Choose from seasonal wax or our signature collection.",
    detailedDescription:
      "From our best-selling Vanilla Amber to limited edition seasonal releases, each candle is designed to create ambiance and relaxation. The natural soy wax ensures an even burn while the cotton wicks are crackle-free. Perfect for gifting or treating yourself to moments of tranquility.",
    image: "/candles/c5.webp?height=400&width=600",
    href: "/products/candles",
    color: "muted-gold",
  },
  {
    name: "Premium wax",
    description:
      "Discover our collection of fine fragrance oils and room sprays, expertly blended to evoke memories and transform moods. Our phthalate-free formulas are designed for both diffusers and direct skin application.",
    detailedDescription:
      "Developed by master perfumers, our scent collection ranges from energizing citrus blends to calming lavender fields. Each 10ml bottle contains approximately 200 drops, lasting 2-3 months with regular use. The perfect way to personalize your space or create signature scent memories.",
    image: "/wax/s6.webp?height=400&width=600",
    href: "/products/wax",
    color: "dusty-rose",
  },
  {
    name: "Curated Books",
    description:
      "Our selection of mindful living books combines practical wisdom with beautiful design. Each title is chosen to inspire personal growth, creativity, and intentional living.",
    detailedDescription:
      "From Japanese minimalism to Scandinavian hygge, our bookshelf features internationally acclaimed authors and hidden gems. Many titles include companion journals or practical exercises. We rotate selections seasonally to bring you fresh perspectives on living well.",
    image: "/books/b5.webp?height=400&width=600",
    href: "/products/books",
    color: "sage-green",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-warm-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal-gray mb-6">
            Discover Our Thoughtful Collections
          </h2>
          <div className="text-lg text-charcoal-gray/70 max-w-3xl mx-auto leading-relaxed">
            <p>
              You crave calm, not chaos. Meaning, not noise. You're tired. Overstimulated. Pulled in
              too many directions. You've got a phone full of notifications and a head full of
              static. You're not just looking for a break—you’re searching for something real.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <span className="flex-grow h-1 bg-muted-gold"></span>
              <span className="whitespace-nowrap text-center navbar">
                We built <strong className="text-muted-gold">UNIQUECOP</strong> for that exact ache.
              </span>
              <span className="flex-grow h-1 bg-muted-gold"></span>
            </div>
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}>
              <div
                className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-2 lg:pl-12" : "lg:pr-12"}`}>
                <div className="space-y-6">
                  <h3 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal-gray">
                    {category.name}
                  </h3>
                  <p className="font-semibold text-charcoal-gray/80 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-charcoal-gray/70 leading-relaxed">
                    {category.detailedDescription}
                  </p>
                </div>
                <Link href={category.href}>
                  <button className="btn-accent mt-6">Explore {category.name}</button>
                </Link>
              </div>

              <div
                className={`relative h-full min-h-[400px] ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}>
                <div className="relative h-full rounded-xl overflow-hidden shadow-2xl group">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
