import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export function TabbedProductCard({product}: {product: any}) {
  const getProductUrl = () => {
    const category = product.category.toLowerCase();
    return `/products/${category}/${product.id}`;
  };

  return (
    <Link href={getProductUrl()}>
      <Card className="group card-hover bg-warm-white border-soft-taupe/20 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={product.image || product.images[0] || '/placeholder.svg'}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <Badge
              className="absolute top-3 left-3 bg-muted-gold/90 text-warm-white"
              variant="secondary">
              {product.badge}
            </Badge>
          </div>

          <div className="p-4 space-y-3">
            <div className="text-sm text-sage-green font-medium">{product.category}</div>
            <h3 className="font-semibold text-charcoal-gray group-hover:text-sage-green transition-colors">
              {product.name}
            </h3>

            {product.rating && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-gold">★★★★★</span>
                <span className="text-charcoal-gray/70">({product.reviews} reviews)</span>
              </div>
            )}

            {product.soldCount && (
              <div className="text-sm text-charcoal-gray/70">{product.soldCount}</div>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-charcoal-gray">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-red-600/90 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button className="w-full btn-accent">View Product</button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
