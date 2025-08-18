"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {useAuth} from "@/contexts/AuthContext";
import {withUserAuth} from "@/HOC/withUserAuth";
import {useCreateOrder} from "@/hooks/use-orders";
import {useToast} from "@/hooks/use-toast";
import {processPayment} from "@/lib/payments";
import {useCartStore} from "@/store/use-cart-store";
import {ArrowLeft, Building2, CreditCard, Shield, Truck} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: "card" | "bank_transfer";
  provider: "paystack" | "opay";
}

const CheckoutPage = () => {
  const {items: cartItems, total: cartTotal, setPendingClearCart} = useCartStore();
  const {user, userData} = useAuth();
  const {toast} = useToast();
  const router = useRouter();
  const createOrderMutation = useCreateOrder();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    provider: "paystack",
  });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
  });
  const [orderNotes, setOrderNotes] = useState("");
  const searchParams = useSearchParams();
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);

  const items = useMemo(() => {
    return buyNowProduct ? [buyNowProduct] : cartItems;
  }, [buyNowProduct, cartItems]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const shipping = subtotal > 75 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const buyNow = searchParams.get("buyNow");
    if (buyNow === "true") {
      const product = {
        id: searchParams.get("id"),
        name: searchParams.get("name"),
        price: Number(searchParams.get("price")),
        image: searchParams.get("image"),
        category: searchParams.get("category"),
        quantity: 1,
      };
      setBuyNowProduct(product);
    }
  }, [searchParams]);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/user/cart");
      return;
    }

    if (user && userData) {
      const [firstName, ...lastNameParts] = (user.displayName || "").split(" ");
      setShippingInfo((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastNameParts.join(" ") || "",
        email: user.email || "",
        phone: userData.phone || "",
        address: userData.address?.street || "",
        city: userData.address?.city || "",
        state: userData.address?.state || "",
        zipCode: userData.address?.zipCode || "",
        country: userData.address?.country || "Nigeria",
      }));
    }
  }, [items, user, userData, router]);

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    const requiredFields: (keyof ShippingInfo)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    for (const field of requiredFields) {
      if (!shippingInfo[field].trim()) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
          variant: "destructive",
        });
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Create order data
      const orderData = {
        userId: user?.uid || null,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingInfo,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
        orderNotes,
        status: "pending",
      };

      // Process payment
      const paymentResult = await processPayment({
        amount: total,
        email: shippingInfo.email,
        paymentMethod,
        orderData,
      });

      if (paymentResult.success) {
        const orderId = await createOrderMutation.mutateAsync({
          ...orderData,
          paymentReference: paymentResult.reference,
          status: "processing",
        });

        toast({
          title: "Order Placed Successfully!",
          description: `Your order #${orderId} has been placed and payment processed.`,
        });

        setPendingClearCart(true);
        router.push(`/user/orders/${orderId}`);
      } else {
        throw new Error(paymentResult.error || "Payment failed");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-sage-green hover:text-sage-green/80">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <div className="h-6 w-px bg-soft-taupe/30" />
            <h1 className="font-playfair text-3xl font-bold text-charcoal-gray">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-sage-green" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-creamy-beige border-soft-taupe/30"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="bg-creamy-beige border-soft-taupe/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <select
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full px-3 py-2 border border-soft-taupe/30 rounded-md bg-creamy-beige text-charcoal-gray"
                      required>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ghana">Ghana</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-sage-green" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={`${paymentMethod.type}-${paymentMethod.provider}`}
                    onValueChange={(value) => {
                      const [type, provider] = value.split("-") as [
                        PaymentMethod["type"],
                        PaymentMethod["provider"]
                      ];
                      setPaymentMethod({type, provider});
                    }}
                    className="space-y-3">
                    <div className="flex items-center space-x-2 p-3 border border-soft-taupe/30 rounded-lg hover:bg-creamy-beige/50">
                      <RadioGroupItem value="card-paystack" id="card-paystack" />
                      <Label htmlFor="card-paystack" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-sage-green" />
                            <div>
                              <div className="font-medium">Credit/Debit Card (Paystack)</div>
                              <div className="text-sm text-charcoal-gray/70">
                                Visa, Mastercard, Verve
                              </div>
                            </div>
                          </div>
                          <div className="text-xs bg-sage-green/10 text-sage-green px-2 py-1 rounded">
                            Recommended
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border border-soft-taupe/30 rounded-lg hover:bg-creamy-beige/50">
                      <RadioGroupItem value="card-opay" id="card-opay" />
                      <Label htmlFor="card-opay" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-dusty-rose" />
                          <div>
                            <div className="font-medium">Credit/Debit Card (OPay)</div>
                            <div className="text-sm text-charcoal-gray/70">
                              Visa, Mastercard, Verve
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border border-soft-taupe/30 rounded-lg hover:bg-creamy-beige/50">
                      <RadioGroupItem value="bank_transfer-paystack" id="bank-paystack" />
                      <Label htmlFor="bank-paystack" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-muted-gold" />
                          <div>
                            <div className="font-medium">Bank Transfer (Paystack)</div>
                            <div className="text-sm text-charcoal-gray/70">
                              Direct bank transfer
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border border-soft-taupe/30 rounded-lg hover:bg-creamy-beige/50">
                      <RadioGroupItem value="bank_transfer-opay" id="bank-opay" />
                      <Label htmlFor="bank-opay" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-muted-gold" />
                          <div>
                            <div className="font-medium">Bank Transfer (OPay)</div>
                            <div className="text-sm text-charcoal-gray/70">
                              Direct bank transfer
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex items-center gap-2 p-3 bg-sage-green/10 rounded-lg">
                    <Shield className="h-4 w-4 text-sage-green" />
                    <span className="text-sm text-charcoal-gray">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special instructions for your order..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="bg-creamy-beige border-soft-taupe/30"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-charcoal-gray">{item.name}</h4>
                          <p className="text-sm text-charcoal-gray/70">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-charcoal-gray">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-charcoal-gray">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-gray">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-gray">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-soft-taupe/30" />
                    <div className="flex justify-between text-lg font-bold text-charcoal-gray">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    variant="ghost"
                    className="w-full btn-accent py-3 text-lg font-medium  rounded hover:border hover:text-muted-gold hover:btn-accent/20 transition-colors">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-warm-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      `Complete Order - $${total.toFixed(2)}`
                    )}
                  </Button>

                  <div className="text-xs text-charcoal-gray/60 text-center">
                    By placing your order, you agree to our{" "}
                    <Link href="/terms" className="text-sage-green hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-sage-green hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUserAuth(CheckoutPage);
