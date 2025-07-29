import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {ShoppingBag} from 'lucide-react';
import Link from 'next/link';

const EmptyCartState = () => {
  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="h-24 w-24 text-sage-green/30 mx-auto mb-6" />
            <h1 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-charcoal-gray/70 text-lg">
              Looks like you haven't added any items to your cart yet. Discover our beautiful
              collection of candles, wax, and books.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/products">
              <Button className="btn-accent px-8 py-3">Start Shopping</Button>
            </Link>
            <div className="text-sm text-charcoal-gray/60">
              or{' '}
              <Link href="/" className="text-sage-green hover:underline">
                return to homepage
              </Link>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products/candles" className="group">
              <Card className="card-hover bg-creamy-beige border-soft-taupe/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-muted-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-muted-gold/80 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
                    Handmade Candles
                  </h3>
                  <p className="text-sm text-charcoal-gray/70 mt-2">Premium soy wax candles</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products/wax" className="group">
              <Card className="card-hover bg-creamy-beige border-soft-taupe/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-sage-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-sage-green/80 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
                    Premium wax
                  </h3>
                  <p className="text-sm text-charcoal-gray/70 mt-2">Essential oils & blends</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products/books" className="group">
              <Card className="card-hover bg-creamy-beige border-soft-taupe/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-dusty-rose/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-dusty-rose/80 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
                    Curated Books
                  </h3>
                  <p className="text-sm text-charcoal-gray/70 mt-2">Mindful living guides</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmptyCartState;
