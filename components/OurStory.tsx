"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function OurStory() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // Very subtle movement

        // Only apply transform within reasonable bounds
        if (Math.abs(rate) < 200) {
          backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Container */}
      <div className="absolute inset-0">
        {/* Background Image with Parallax */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/candles/c1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-charcoal-gray/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-warm-white">
          <h2 className="font-playfair text-5xl font-bold mb-6">Our Story</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Founded in 2019, Lumina began as a passion project in a small studio
            apartment. What started with a simple desire to create beautiful,
            natural candles has grown into a mindful lifestyle brand dedicated
            to bringing peace and tranquility into everyday life.
          </p>
          <p className="text-lg mb-10 opacity-90">
            Every product we create is infused with intention, crafted with
            care, and designed to help you create moments of calm in your busy
            world. From hand-poured candles to carefully curated books, each
            item tells a story of mindful living and sustainable craftsmanship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-gold mb-2">
                2019
              </div>
              <div className="text-sm opacity-90">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-gold mb-2">
                10K+
              </div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-gold mb-2">
                100%
              </div>
              <div className="text-sm opacity-90">Natural Ingredients</div>
            </div>
          </div>

          <Link href="/about">
            <Button className="bg-warm-white text-charcoal-gray hover:bg-warm-white/90 px-8 py-3 font-medium">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-dusty-rose/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-sage-green/20 rounded-full blur-xl" />
    </section>
  );
}
