import {Product} from '@/components/ProductGrid';
import {CartItem} from '@/store/use-cart-store';
import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProductUrl = (product: Product | CartItem) => {
  const category = product?.category?.toLowerCase();
  return `/products/${category}/${product.id}`;
};
