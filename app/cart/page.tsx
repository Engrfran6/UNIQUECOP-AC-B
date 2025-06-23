'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {useToast} from '@/hooks/use-toast';
import {useCartStore} from '@/store/use-cart-store';
import {ArrowLeft, Gift, Minus, Plus, Shield, ShoppingBag, Trash2, Truck} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

export default function CartPage() {
  const {items, updateQuantity, removeItem, clearCart} = useCartStore((state) => state);

  const {toast} = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const promoDiscount =
    appliedPromo === 'WELCOME10' ? subtotal * 0.1 : appliedPromo === 'SAVE20' ? subtotal * 0.2 : 0;
  const shipping = subtotal > 75 ? 0 : 8.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast({
      title: 'Item removed',
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleApplyPromo = () => {
    const validCodes = ['WELCOME10', 'SAVE20', 'FREESHIP'];
    if (validCodes.includes(promoCode.toUpperCase())) {
      setAppliedPromo(promoCode.toUpperCase());
      toast({
        title: 'Promo code applied!',
        description: `${promoCode.toUpperCase()} discount has been applied to your order.`,
      });
      setPromoCode('');
    } else {
      toast({
        title: 'Invalid promo code',
        description: 'Please check your promo code and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Redirecting to checkout...',
      description: 'Taking you to complete your purchase securely.',
    });
    setIsCheckingOut(false);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  if (items.length === 0) {
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
                collection of candles, scents, and books.
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

              <Link href="/products/scents" className="group">
                <Card className="card-hover bg-creamy-beige border-soft-taupe/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sage-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-sage-green/80 rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
                      Premium Scents
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
  }

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-green hover:text-sage-green/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div className="h-6 w-px bg-soft-taupe/30" />
            <h1 className="font-playfair text-3xl font-bold text-charcoal-gray">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-charcoal-gray/70 hover:text-red-600 border-soft-taupe/30">
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-warm-white border-soft-taupe/20">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 md:w-30 md:h-30 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-charcoal-gray text-lg mb-1">
                            {item.name}
                          </h3>
                          <div className="text-sm text-charcoal-gray/70">
                            SKU: #{item.id.toString().padStart(6, '0')}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-charcoal-gray/50 hover:text-red-600 p-2">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-charcoal-gray/70">Qty:</span>
                          <div className="flex items-center border border-soft-taupe/30 rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 hover:bg-sage-green/10">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium text-charcoal-gray min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-sage-green/10">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-charcoal-gray">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-charcoal-gray/70">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Promo Code */}
            <Card className="bg-creamy-beige border-soft-taupe/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="h-5 w-5 text-sage-green" />
                  <h3 className="font-semibold text-charcoal-gray">Promo Code</h3>
                </div>

                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-sage-green/10 rounded-md">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sage-green text-warm-white">{appliedPromo}</Badge>
                      <span className="text-sm text-charcoal-gray">Applied successfully!</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAppliedPromo(null)}
                      className="text-charcoal-gray/70 hover:text-red-600">
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-warm-white border-soft-taupe/30"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      variant="outline"
                      className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white">
                      Apply
                    </Button>
                  </div>
                )}

                <div className="mt-3 text-xs text-charcoal-gray/60">
                  Try: WELCOME10, SAVE20, or FREESHIP
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-warm-white border-soft-taupe/20 sticky top-8">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-charcoal-gray">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Pricing Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-charcoal-gray">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sage-green">
                      <span>Discount ({appliedPromo})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-charcoal-gray">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between text-charcoal-gray">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  <div className="flex justify-between text-lg font-bold text-charcoal-gray">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="p-3 bg-dusty-rose/10 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-dusty-rose" />
                      <span className="text-sm font-medium text-charcoal-gray">
                        Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                      </span>
                    </div>
                    <div className="w-full bg-soft-taupe/30 rounded-full h-2">
                      <div
                        className="bg-dusty-rose h-2 rounded-full transition-all duration-300"
                        style={{width: `${Math.min((subtotal / 75) * 100, 100)}%`}}
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-accent py-3 text-lg font-medium">
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                {/* Security & Guarantees */}
                <div className="space-y-3 pt-4 border-t border-soft-taupe/20">
                  <div className="flex items-center gap-3 text-sm text-charcoal-gray/70">
                    <Shield className="h-4 w-4 text-sage-green" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal-gray/70">
                    <Truck className="h-4 w-4 text-sage-green" />
                    <span>Free shipping on orders over $75</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal-gray/70">
                    <Gift className="h-4 w-4 text-sage-green" />
                    <span>45-day return policy</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-soft-taupe/20">
                  <div className="text-sm text-charcoal-gray/70 mb-2">We accept:</div>
                  <div className="flex gap-2">
                    {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                      <div
                        key={method}
                        className="px-2 py-1 bg-soft-taupe/20 rounded text-xs text-charcoal-gray/60">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
