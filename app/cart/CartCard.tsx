import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {getProductUrl} from '@/lib/utils';
import {CartItem} from '@/store/use-cart-store';
import {ArrowUpRightIcon, Minus, Plus, Trash2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Cart {
  item: CartItem;
  handleRemoveItem: (id: number, name: string) => void;
  handleQuantityChange: (id: number, quantity: number) => void;
}

const CartCard = ({item, handleRemoveItem, handleQuantityChange}: Cart) => {
  return (
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
                <Link href={getProductUrl(item)}>
                  <h3 className="group flex font-semibold text-charcoal-gray text-lg mb-1 hover:text-muted-gold">
                    {item.name}
                    <span className="hidden group-hover:inline-flex ml-1 text-blue-700">
                      <ArrowUpRightIcon size={16} />
                    </span>
                  </h3>
                </Link>
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
                <div className="text-sm text-charcoal-gray/70">${item.price.toFixed(2)} each</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CartCard;
