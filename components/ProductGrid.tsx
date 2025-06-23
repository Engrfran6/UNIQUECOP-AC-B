'use client';

import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {AddToCartButton} from './AddToCartButton';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category: string;
  badge?: string;
  description: string;
  [key: string]: any;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({products}: ProductGridProps) {
  const getProductUrl = (product: Product) => {
    const category = product.category.toLowerCase();
    return `/products/${category}/${product.id}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={getProductUrl(product)}>
          <Card className="group card-hover bg-warm-white border-soft-taupe/20 cursor-pointer">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || product.images?.[0] || '/placeholder.svg'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <Badge
                    className="absolute top-3 left-3 bg-muted-gold/90 text-warm-white"
                    variant="secondary">
                    {product.badge}
                  </Badge>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div className="text-sm text-sage-green font-medium">{product.category}</div>
                <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-charcoal-gray/70 line-clamp-2">{product.description}</p>

                {/* Product specific details */}
                {product.scent && (
                  <div className="text-xs text-charcoal-gray/60">Scent: {product.scent}</div>
                )}
                {product.author && (
                  <div className="text-xs text-charcoal-gray/60">By {product.author}</div>
                )}
                {product.type && (
                  <div className="text-xs text-charcoal-gray/60">Type: {product.type}</div>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-charcoal-gray">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-charcoal-gray/50 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <AddToCartButton product={product} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
