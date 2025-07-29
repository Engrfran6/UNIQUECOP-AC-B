import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {validCodes} from '@/data/data';
import {useToast} from '@/hooks/use-toast';
import {Gift} from 'lucide-react';
import {useState} from 'react';

interface PromoCodeProps {
  appliedPromo: string;
  setAppliedPromo: (applyCode: string | null) => void;
}

const PromoCode = ({appliedPromo, setAppliedPromo}: PromoCodeProps) => {
  const {toast} = useToast();
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    if (validCodes.includes(promoCode.toUpperCase())) {
      setAppliedPromo(promoCode.toUpperCase());
      toast({
        variant: 'success',
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
  return (
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
  );
};
export default PromoCode;
