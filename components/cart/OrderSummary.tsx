import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {CartItem} from '@/store/use-cart-store';
import {Gift, Shield, Truck} from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  tax: number;
  subtotal: number;
  promoDiscount: number;
  appliedPromo: string;
  shipping: number;
  handleCheckout: () => void;
  isCheckingOut: boolean;
}

const OrderSummary = ({
  items,
  subtotal,
  total,
  tax,
  promoDiscount,
  appliedPromo,
  shipping,
  handleCheckout,
  isCheckingOut,
}: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <Card className="bg-warm-white border-soft-taupe/20 sticky top-8">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl text-charcoal-gray">Order Summary</CardTitle>
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
  );
};
export default OrderSummary;
