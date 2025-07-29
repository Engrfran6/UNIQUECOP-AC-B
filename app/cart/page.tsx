'use client';

import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useCartStore} from '@/store/use-cart-store';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import CartCard from './CartCard';
import EmptyCartState from './EmptyCartState';
import OrderSummary from './OrderSummary';
import PromoCode from './PromoCode';

export default function CartPage() {
  const {items, updateQuantity, removeItem, clearCart} = useCartStore((state) => state);
  const router = useRouter();
  const {toast} = useToast();
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

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add some items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }

    // Redirect to checkout page
    router.push('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };

  if (items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-green hover:text-sage-green/80 w-full md:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="font-playfair text-xl md:text-3xl font-bold text-charcoal-gray text-center md:text-left">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-charcoal-gray/70 hover:text-red-600 border-soft-taupe/30 w-full md:w-auto">
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))}

            {/* Promo Code */}
            <PromoCode setAppliedPromo={setAppliedPromo} appliedPromo={appliedPromo!!} />
          </div>

          {/* Order Summary */}
          <OrderSummary
            items={items}
            total={total}
            subtotal={subtotal}
            tax={tax}
            promoDiscount={promoDiscount}
            appliedPromo={appliedPromo!}
            shipping={shipping}
            handleCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />
        </div>
      </div>
    </div>
  );
}
