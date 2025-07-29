'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {useAuth} from '@/contexts/AuthContext';
import {getOrder, type Order} from '@/lib/orders';
import {useCartStore} from '@/store/use-cart-store';
import {ArrowLeft, CheckCircle, Clock, Download, Package, RefreshCw, Truck} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

interface PageProps {
  params: Promise<{id: string}>;
}

export default function OrderDetailsPage({params}: PageProps) {
  const {user} = useAuth();
  const {pendingClearCart, setPendingClearCart, clearCart} = useCartStore();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    if (pendingClearCart) {
      clearCart();
      setPendingClearCart(false);
    }
  }, [pendingClearCart]);

  useEffect(() => {
    const getOrderId = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    getOrderId();
  }, [params]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        setIsLoading(true);
        const orderData = await getOrder(orderId);

        if (!orderData) {
          router.push('/orders');
          return;
        }

        // Check if user owns this order (or allow guest access)
        if (orderData.userId && user && orderData.userId !== user.uid) {
          router.push('/orders');
          return;
        }

        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-muted-gold text-warm-white';
      case 'shipped':
        return 'bg-sage-green text-warm-white';
      case 'delivered':
        return 'bg-dusty-rose text-warm-white';
      default:
        return 'bg-charcoal-gray text-warm-white';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-gold"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-warm-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
            Order Not Found
          </h1>
          <p className="text-charcoal-gray/70 mb-8">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link href="/orders">
            <Button className="btn-accent">Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/orders">
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-green hover:text-sage-green/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <div className="h-6 w-px bg-soft-taupe/30" />
            <div>
              <h1 className="font-playfair text-3xl font-bold text-charcoal-gray">Order Details</h1>
              <p className="text-charcoal-gray/70">Order #{order.id}</p>
            </div>
          </div>

          {/* Order Status */}
          <Card className="bg-warm-white border-soft-taupe/20 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <span className="text-charcoal-gray/70">
                      Placed on{' '}
                      {order.createdAt?.toDate().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <p className="text-sm text-charcoal-gray/70">
                      Tracking: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-charcoal-gray">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-charcoal-gray/70">{order.items.length} items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <Card className="bg-warm-white border-soft-taupe/20">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-creamy-beige rounded-lg">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={80}
                      height={80}
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

                <Separator className="bg-soft-taupe/30" />

                {/* Order Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-charcoal-gray">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-gray">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-gray">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-soft-taupe/30" />
                  <div className="flex justify-between text-lg font-bold text-charcoal-gray">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Information */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium text-charcoal-gray">
                      {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                    </div>
                    <div className="text-sm text-charcoal-gray/70">{order.shippingInfo.email}</div>
                    <div className="text-sm text-charcoal-gray/70">{order.shippingInfo.phone}</div>
                  </div>
                  <div className="text-sm text-charcoal-gray/70">
                    {order.shippingInfo.address}
                    <br />
                    {order.shippingInfo.city}, {order.shippingInfo.state}{' '}
                    {order.shippingInfo.zipCode}
                    <br />
                    {order.shippingInfo.country}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal-gray/70">Payment Method:</span>
                    <span className="font-medium text-charcoal-gray capitalize">
                      {order.paymentMethod.type.replace('_', ' ')} ({order.paymentMethod.provider})
                    </span>
                  </div>
                  {order.paymentReference && (
                    <div className="flex justify-between">
                      <span className="text-charcoal-gray/70">Reference:</span>
                      <span className="font-medium text-charcoal-gray">
                        {order.paymentReference}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Timeline */}
              {order.timeline && order.timeline.length > 0 && (
                <Card className="bg-warm-white border-soft-taupe/20">
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            event.status === order.status ? 'bg-sage-green' : 'bg-soft-taupe'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-charcoal-gray capitalize">
                              {event.status === 'ordered' ? 'Order Placed' : event.status}
                            </span>
                            <span className="text-sm text-charcoal-gray/70">
                              {event.date} at {event.time}
                            </span>
                          </div>
                          {event.description && (
                            <p className="text-sm text-charcoal-gray/70 mt-1">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Order Actions */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>

                    {order.trackingNumber && (
                      <Button
                        variant="outline"
                        className="border-dusty-rose text-dusty-rose hover:bg-dusty-rose hover:text-warm-white bg-transparent">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    )}

                    {order.status === 'delivered' && (
                      <Button
                        variant="outline"
                        className="border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-warm-white bg-transparent">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
