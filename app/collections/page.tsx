'use client';

import {Pagination} from '@/components/Pagination';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {usePagination} from '@/hooks/use-pagination';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    id: 1,
    name: 'Zen Collection',
    description:
      'Find your inner peace with our meditation-inspired candles, calming scents, and mindfulness books',
    image: '/collections/collection1.webp?height=400&width=600',
    products: ['Sandalwood Serenity Candle', 'Zen Garden Scent', 'Meditation for Beginners'],
    price: 'From $16',
    href: '/collections/zen',
  },
  {
    id: 2,
    name: 'Romantic Evening',
    description:
      'Create the perfect romantic atmosphere with rose candles, sensual scents, and love poetry',
    image: '/collections/collection2.webp?height=400&width=600',
    products: ['Rose Garden Candle', 'Rose Absolute Scent', 'Love Letters Book'],
    price: 'From $22',
    href: '/collections/romantic',
  },
  {
    id: 3,
    name: 'Energy Boost',
    description:
      'Energize your space and mind with citrus candles, invigorating scents, and motivational reads',
    image: '/collections/collection3.webp?height=400&width=600',
    products: ['Citrus Burst Candle', 'Citrus Energizer Scent', 'Morning Rituals Book'],
    price: 'From $18',
    href: '/collections/energy',
  },
  {
    id: 4,
    name: 'Cozy Home',
    description:
      'Transform your space into a warm sanctuary with vanilla candles, comforting scents, and home guides',
    image: '/collections/collection4.webp?height=400&width=600',
    products: ['Vanilla Amber Candle', 'Warm Vanilla Scent', 'Creating Sacred Spaces'],
    price: 'From $20',
    href: '/collections/cozy',
  },
  {
    id: 5,
    name: 'Sleep & Relaxation',
    description:
      'Unwind and prepare for restful sleep with lavender candles, calming scents, and bedtime stories',
    image: '/collections/collection5.webp?height=400&width=600',
    products: ['Lavender Dreams Candle', 'Lavender Dreams Scent', 'Bedtime Stories Book'],
    price: 'From $19',
    href: '/collections/sleep',
  },
  {
    id: 6,
    name: 'Gift Sets',
    description:
      'Beautifully curated gift sets perfect for any occasion, thoughtfully packaged with love',
    image: '/collections/collection6.webp?height=400&width=600',
    products: ['Starter Set', 'Luxury Collection', "Book Lover's Bundle"],
    price: 'From $45',
    href: '/collections/gifts',
  },
];

export default function CollectionsPage() {
  const {currentItems, currentPage, totalPages, goToPage} = usePagination({
    items: collections,
    itemsPerPage: 10,
  });
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-creamy-beige py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Curated Collections
            </h1>
            <p className="text-lg text-charcoal-gray/80">
              Thoughtfully assembled collections that bring together our candles, scents, and books
              to create complete experiences for every mood and moment.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((collection) => (
              <Card
                key={collection.id}
                className="group card-hover bg-warm-white border-soft-taupe/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={collection.image || '/placeholder.svg'}
                      alt={collection.name}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium">{collection.price}</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-playfair text-2xl font-bold text-charcoal-gray group-hover:text-muted-gold transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-charcoal-gray/70">{collection.description}</p>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-charcoal-gray">Includes:</div>
                      <ul className="text-sm text-charcoal-gray/70 space-y-1">
                        {collection.products.map((product, index) => (
                          <li key={index}>• {product}</li>
                        ))}
                      </ul>
                    </div>

                    <Link href={collection.href}>
                      <button className="w-full !btn-accent ">Explore Collection</button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          )}
        </div>
      </section>

      {/* Custom Collections CTA */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
              Create Your Own Collection
            </h2>
            <p className="text-charcoal-gray/70 mb-8">
              Can't find the perfect combination? Let us help you create a custom collection
              tailored to your preferences and needs.
            </p>
            <Button className="btn-accent">Contact Us for Custom Collections</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
