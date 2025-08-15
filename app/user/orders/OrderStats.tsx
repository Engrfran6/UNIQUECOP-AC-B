import {Card, CardContent} from "@/components/ui/card";
import {Order} from "@/lib/types";

interface OrderStatsProps {
  orders: Order[];
}

const OrderStats = ({orders}: OrderStatsProps) => {
  return (
    <Card className="bg-creamy-beige border-soft-taupe/20 mt-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-charcoal-gray">{orders.length}</div>
            <div className="text-sm text-charcoal-gray/70">Total Orders</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sage-green">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-charcoal-gray/70">Total Spent</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-dusty-rose">
              {orders.filter((order) => order.status === "delivered").length}
            </div>
            <div className="text-sm text-charcoal-gray/70">Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-muted-gold">
              {orders.reduce((sum, order) => sum + order.items.length, 0)}
            </div>
            <div className="text-sm text-charcoal-gray/70">Items Purchased</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderStats;
