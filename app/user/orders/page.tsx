"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {useAuth} from "@/contexts/AuthContext";
import {withUserAuth} from "@/HOC/withUserAuth";

import {useUserOrders} from "@/hooks/use-orders";
import {downloadReceipt} from "@/lib/receipts";
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  Package,
  RefreshCw,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import EmptyOrderState from "./EmptyOrderState";
import OrderStats from "./OrderStats";

const statusConfig = {
  processing: {
    label: "Processing",
    color: "bg-muted-gold text-warm-white",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color: "bg-sage-green text-warm-white",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-dusty-rose text-warm-white",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-charcoal-gray text-warm-white",
    icon: XCircle,
  },
};

const OrdersPage = () => {
  const {user, loading} = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const {data: orders = [], isLoading: isOrdersLoading, isError} = useUserOrders(user?.uid ?? "");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading || isOrdersLoading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-gold"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Package;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge
        className={`${
          config?.color || "bg-charcoal-gray text-warm-white"
        } flex items-center gap-1`}>
        {getStatusIcon(status)}
        {config?.label || status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl font-bold text-charcoal-gray mb-2">
              Order History
            </h1>
            <p className="text-charcoal-gray/70">Track and manage your orders</p>
          </div>

          {/* Search and Filter */}
          <Card className="bg-warm-white border-soft-taupe/20 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-creamy-beige border-soft-taupe/30"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-soft-taupe/30 rounded-md bg-creamy-beige text-charcoal-gray text-sm">
                    <option value="">All Orders</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select className="px-3 py-2 border border-soft-taupe/30 rounded-md bg-creamy-beige text-charcoal-gray text-sm">
                    <option value="">All Time</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 3 months</option>
                    <option value="365">Last year</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <EmptyOrderState searchTerm={searchTerm} />
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="bg-warm-white border-soft-taupe/20">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="font-playfair text-xl text-charcoal-gray">
                          Order {order.id}
                        </CardTitle>
                        <p className="text-charcoal-gray/70">
                          Placed on{" "}
                          {order.createdAt
                            ? (() => {
                                // Handle Firestore Timestamp or string
                                if (
                                  typeof order.createdAt === "object" &&
                                  order.createdAt !== null &&
                                  "toDate" in order.createdAt
                                ) {
                                  // @ts-ignore
                                  return order.createdAt.toDate().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  });
                                }
                                return new Date(order.createdAt as string).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                );
                              })()
                            : "Unknown date"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <div className="text-right">
                          <div className="font-bold text-charcoal-gray">
                            ${order.total.toFixed(2)}
                          </div>
                          <div className="text-sm text-charcoal-gray/70">
                            {order.items.length} items
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 bg-creamy-beige rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-charcoal-gray">{item.name}</h4>
                            <p className="text-sm text-charcoal-gray/70">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-charcoal-gray">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="bg-soft-taupe/30" />

                    {/* Order Timeline */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-charcoal-gray">Order Timeline</h4>
                      <div className="space-y-2">
                        {order?.timeline?.map((event, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                event.status === order.status ? "bg-sage-green" : "bg-soft-taupe"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-charcoal-gray capitalize">
                                  {event.status === "ordered" ? "Order Placed" : event.status}
                                </span>
                                <span className="text-sm text-charcoal-gray/70">
                                  {event.date} at {event.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Information */}
                    {order.trackingNumber && (
                      <>
                        <Separator className="bg-soft-taupe/30" />
                        <div className="space-y-2">
                          <h4 className="font-semibold text-charcoal-gray">Shipping Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-charcoal-gray/70">Shipping Method:</span>
                              <div className="font-medium text-charcoal-gray">{order?.method}</div>
                            </div>
                            <div>
                              <span className="text-charcoal-gray/70">Tracking Number:</span>
                              <div className="font-medium text-charcoal-gray">
                                {order.trackingNumber}
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-charcoal-gray/70">Shipping Address:</span>
                              <div className="font-medium text-charcoal-gray">
                                {order.shippingInfo.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator className="bg-soft-taupe/30" />

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/user/orders/${order.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>

                      {order.trackingNumber && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-warm-white bg-transparent">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-soft-taupe/30 text-charcoal-gray hover:bg-creamy-beige bg-transparent"
                        onClick={() => downloadReceipt(order)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>

                      {order.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-warm-white bg-transparent">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Order Summary Stats */}
          <OrderStats orders={orders} />
        </div>
      </div>
    </div>
  );
};
export default withUserAuth(OrdersPage);
