import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {Toaster} from '@/components/ui/toaster';
import {CartProvider} from '@/contexts/CartContext';
import type {Metadata} from 'next';
import {Inter, Playfair_Display} from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'UNIQUECOP AC&B Candles - Handcrafted Candles, Scents & Books',
  description:
    'Discover our collection of handmade candles, premium scents, and curated books. Create the perfect ambiance for your space.',
  keywords: 'handmade candles, scented candles, aromatherapy, books, home decor',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter bg-warm-white text-charcoal-gray">
        <CartProvider>
          <Header />
          {children}
          {/* <ExitPopup /> */}
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
