import {Card, CardContent} from '@/components/ui/card';
import {getProductUrl} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {AddToCartButton} from './AddToCartButton';

export interface Collection {
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

interface CollectionGridProps {
  currentItems: Collection[];
  classNames?: string;
}

const CollectionGrid = ({currentItems}: CollectionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {currentItems.map((collection) => (
        <Card
          key={collection.id}
          className="group card-hover bg-warm-white border-soft-taupe/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <Image
                src={collection.image || collection.images?.[0] || '/placeholder.svg'}
                alt={collection.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">from ${collection.price}</div>
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
                  {collection.products.map((product: any, index: any) => (
                    <li key={index}>• {product}</li>
                  ))}
                </ul>
              </div>

              <Link href={getProductUrl(collection)} className="block">
                <button className="w-full !btn-accent mt-6">Explore Collection</button>
              </Link>
              <AddToCartButton product={collection} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default CollectionGrid;
