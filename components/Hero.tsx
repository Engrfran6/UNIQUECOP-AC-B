"use client";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef} from "react";
import {Button} from "./ui/button";

export default function Hero() {
  const bgImageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const bookImageRef = useRef<HTMLDivElement>(null);
  const scentImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Background image parallax (subtle movement)
    gsap.to(bgImageRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: bgImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Foreground images parallax (more pronounced)
    gsap.to(mainImageRef.current, {
      y: 80,
      ease: "none",
      scrollTrigger: {
        trigger: mainImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(bookImageRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: bookImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(scentImageRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: scentImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div ref={bgImageRef} className="absolute inset-0 z-10 w-full h-full">
        <Image
          src="/hero/hero_bg.webp" // Use your background image path
          alt="Background texture"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/70 via-warm-white/20 to-warm-white/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-charcoal-gray leading-tight">
                Handcrafted
                <span className="block text-muted-gold">Candles</span>
                for Every Moment
              </h1>
              <p className="text-lg text-charcoal-gray/80 max-w-lg">
                Discover our collection of artisanal candles, premium wax, and curated books. Create
                the perfect ambiance for your space with our handmade creations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products/collections">
                <button className="btn-accent">Shop Collection</button>
              </Link>
              <Link href="/about">
                <button className="btn-secondary">Our Story</button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              ref={mainImageRef}
              className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src="/candles/hero_img.webp?height=500&width=400"
                alt="Handcrafted candles in golden light"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-muted-gold/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="font-bold text-white text-2xl border-4 border-muted-gold">
                  View candles
                </Button>
              </div>
            </div>

            <div
              ref={bookImageRef}
              className="absolute h-[400px] -right-32 top-20 w-[200px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/books/b1.webp?height=500&width=400"
                alt="Curated books"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-muted-gold/20 to-transparent" />
            </div>

            <div
              ref={scentImageRef}
              className="absolute h-[300px] w-[200px] -left-28 top-2/3 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/wax/s5.webp?height=500&width=400"
                alt="Premium wax"
                fill
                className="object-cover opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-muted-gold/20 to-transparent" />
            </div>

            <div className="absolute -top-4 -right-4 bg-dusty-rose/15 rounded-full w-24 h-24 blur-xl" />
            <div className="absolute -bottom-8 -left-8 bg-sage-green/15 rounded-full w-32 h-32 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
