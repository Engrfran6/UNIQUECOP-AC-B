import CategoryShowcase from '@/components/CategoryShowcase';
import Hero from '@/components/Hero';
import LoadingSpinner from '@/components/LoadingSpinner';
import Newsletter from '@/components/Newsletter';
import OurStory from '@/components/OurStory';
import TabbedProducts from '@/components/TabbedProducts';
import Testimonials from '@/components/Testimonials';
import {Suspense} from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-warm-white">
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <TabbedProducts />
      </Suspense>
      <CategoryShowcase />
      <OurStory />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
