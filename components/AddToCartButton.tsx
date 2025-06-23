'use client';

import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useCartStore} from '@/store/use-cart-store';
import {Product} from './ProductGrid';

export function AddToCartButton({product}: {product: Product}) {
  const addItem = useCartStore((state) => state.addItem);
  const {toast} = useToast();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();

    addItem({
      id: typeof product.id === 'string' ? Number.parseInt(product.id) : product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || '/placeholder.svg',
    });

    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button
      className="w-full btn-accent hover:border rounded-full border-muted-gold"
      onClick={(e) => handleAddToCart(product, e)}>
      Add to Cart
    </Button>
  );
}
