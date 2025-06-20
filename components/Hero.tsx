import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-charcoal-gray leading-tight">
                Handcrafted
                <span className="block text-muted-gold">Candles</span>
                for Every Moment
              </h1>
              <p className="text-lg text-charcoal-gray/80 max-w-lg">
                Discover our collection of artisanal candles, premium scents,
                and curated books. Create the perfect ambiance for your space
                with our handmade creations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="btn-accent">Shop Collection</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="btn-secondary">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src="/candles/hero_img.webp?height=500&width=400"
                alt="Handcrafted candles in golden light"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-muted-gold/20 to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-dusty-rose/15 rounded-full w-24 h-24 blur-xl" />
            <div className="absolute -bottom-8 -left-8 bg-sage-green/15 rounded-full w-32 h-32 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
