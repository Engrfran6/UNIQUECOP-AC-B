'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useEffect, useRef} from 'react';

export default function OurStory() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.backgroundPositionY = `${scrollY * 0.3}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[700px] overflow-hidden">
      {/* Rock-solid background implementation */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/candles/c1.webp')] bg-cover bg-center"
        style={{
          backgroundAttachment: 'fixed',
          willChange: 'background-position',
          backgroundPositionY: '0px',
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-gray/40 to-charcoal-gray/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-warm-white">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 mb-12">
              <p className="text-xl md:text-2xl leading-relaxed">
                Founded in 2019, Lumina began as a passion project in a small studio apartment. What
                started with a simple desire to create beautiful, natural candles has grown into a
                mindful lifestyle brand dedicated to bringing peace and tranquility into everyday
                life.
              </p>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Every product we create is infused with intention, crafted with care, and designed
                to help you create moments of calm in your busy world. From hand-poured candles to
                carefully curated books, each item tells a story of mindful living and sustainable
                craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {value: '2019', label: 'Founded'},
                {value: '10K+', label: 'Happy Customers'},
                {value: '100%', label: 'Natural Ingredients'},
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-muted-gold mb-2">{item.value}</div>
                  <div className="text-sm uppercase tracking-wider opacity-90">{item.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button
                className="bg-muted-gold hover:bg-muted-gold/90 text-warm-white px-10 py-4 text-lg font-medium
                          transition-all hover:scale-105 shadow-lg">
                Our Full Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-muted-gold/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-sage-green/20 rounded-full filter blur-3xl animate-pulse" />
    </section>
  );
}
