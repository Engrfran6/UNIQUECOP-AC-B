"use client";

import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useAdmin} from "@/contexts/AdminContext";

const OrdersView = () => {
  const {orders, hasPermission, updateOrderStatus} = useAdmin();
  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Management ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">Order #{order.id.slice(-8)}</h3>
                    <Badge
                      variant={order.status === "delivered" ? "default" : "secondary"}
                      className={
                        order.status === "delivered"
                          ? "bg-green-500 text-white"
                          : order.status === "shipped"
                          ? "bg-blue-500 text-white"
                          : order.status === "processing"
                          ? "bg-yellow-500 text-white"
                          : order.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-white"
                      }>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Customer:</span> {order.userEmail}
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Items:</span> {order.items.length}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasPermission("manage_orders") && (
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
export default OrdersView;
