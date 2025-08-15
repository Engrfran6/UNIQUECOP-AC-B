import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Package} from 'lucide-react';
import Link from 'next/link';

const EmptyOrderState = (searchTerm: any) => {
  return (
    <Card className="bg-warm-white border-soft-taupe/20">
      <CardContent className="p-12 text-center">
        <Package className="h-16 w-16 text-sage-green/30 mx-auto mb-4" />
        <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-2">
          No Orders Found
        </h3>
        <p className="text-charcoal-gray/70 mb-6">
          {searchTerm
            ? 'No orders match your search criteria.'
            : "You haven't placed any orders yet."}
        </p>
        <Link href="/products">
          <Button className="btn-accent">Start Shopping</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
export default EmptyOrderState;
