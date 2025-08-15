import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Clock, Gift, MapPin, Package, Shield, Truck} from 'lucide-react';

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-sage-green/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Shipping Information
            </h1>
            <p className="text-lg text-charcoal-gray/80">
              Fast, reliable shipping to get your favorite products to you safely and quickly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Shipping Options */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Shipping Options
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sage-green/20 rounded-full flex items-center justify-center">
                    <Truck className="h-8 w-8 text-sage-green" />
                  </div>
                  <CardTitle className="text-xl">Standard Shipping</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge className="bg-sage-green text-warm-white">FREE on orders $50+</Badge>
                  <p className="text-charcoal-gray/70">5-7 business days</p>
                  <p className="text-sm text-charcoal-gray/60">$5.99 for orders under $50</p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-dusty-rose/20 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-dusty-rose" />
                  </div>
                  <CardTitle className="text-xl">Express Shipping</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge className="bg-dusty-rose text-warm-white">$12.99</Badge>
                  <p className="text-charcoal-gray/70">2-3 business days</p>
                  <p className="text-sm text-charcoal-gray/60">Available nationwide</p>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted-gold/20 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-gold" />
                  </div>
                  <CardTitle className="text-xl">Overnight</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge className="bg-muted-gold text-warm-white">$24.99</Badge>
                  <p className="text-charcoal-gray/70">Next business day</p>
                  <p className="text-sm text-charcoal-gray/60">Order by 2PM WAT</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Shipping Zones */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Shipping Zones
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-sage-green" />
                    <CardTitle>Nigeria</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-charcoal-gray/70">
                    We ship to all 36 states including Lagos and Abuja.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Standard (5-7 days):</span>
                      <span className="text-sm font-medium">FREE on $50+ / $5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Express (2-3 days):</span>
                      <span className="text-sm font-medium">$12.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Overnight:</span>
                      <span className="text-sm font-medium">$24.99</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-dusty-rose" />
                    <CardTitle>Ghana</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-charcoal-gray/70">
                    We ship to all Ghanian provinces and territories.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Standard (7-10 days):</span>
                      <span className="text-sm font-medium">$15.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Express (4-6 days):</span>
                      <span className="text-sm font-medium">$29.99</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-gray/60">
                    * Additional duties and taxes may apply
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Processing & Packaging */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Processing & Packaging
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Card className="bg-warm-white border-soft-taupe/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-sage-green" />
                      <CardTitle>Processing Time</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-charcoal-gray/70">
                      Most orders are processed and shipped within 1-2 business days.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Standard Items:</span>
                        <span className="text-sm font-medium">1-2 business days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Custom Orders:</span>
                        <span className="text-sm font-medium">3-5 business days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gift Sets:</span>
                        <span className="text-sm font-medium">2-3 business days</span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-gray/60">
                      Orders placed after 2PM WAT will be processed the next business day.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-warm-white border-soft-taupe/20 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Gift className="h-6 w-6 text-dusty-rose" />
                      <CardTitle>Packaging</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-charcoal-gray/70">
                      Every order is carefully packaged to ensure safe delivery.
                    </p>
                    <ul className="space-y-2 text-sm text-charcoal-gray/70">
                      <li>• Eco-friendly packaging materials</li>
                      <li>• Protective cushioning for fragile items</li>
                      <li>• Branded tissue paper and stickers</li>
                      <li>• Gift wrapping available at checkout</li>
                      <li>• Tracking information provided</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Special Considerations */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Special Considerations
            </h2>

            <div className="space-y-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-muted-gold" />
                    <CardTitle>Temperature Sensitive Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal-gray/70 mb-4">
                    Our candles and wax melts are temperature sensitive. During extreme weather
                    conditions:
                  </p>
                  <ul className="space-y-2 text-sm text-charcoal-gray/70">
                    <li>
                      • Summer months: We may hold shipments during heat waves to prevent melting
                    </li>
                    <li>
                      • Winter months: Extra insulation may be added for cold weather protection
                    </li>
                    <li>• We'll notify you of any weather-related delays</li>
                    <li>• Consider express shipping during extreme temperatures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Holidays & Peak Seasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal-gray/70 mb-4">
                    During busy seasons, processing and shipping times may be extended:
                  </p>
                  <ul className="space-y-2 text-sm text-charcoal-gray/70">
                    <li>• Holiday seasons: Allow extra 2-3 days for processing</li>
                    <li>• Valentine's Day, Mother's Day: High demand periods</li>
                    <li>• Black Friday/Cyber Monday: Extended processing times</li>
                    <li>• We recommend ordering early during peak seasons</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center bg-creamy-beige rounded-lg p-8">
            <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
              Questions About Shipping?
            </h3>
            <p className="text-charcoal-gray/70 mb-6">
              Our customer service team is here to help with any shipping questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-sm">
                <strong>Email:</strong> shipping@uniquecop.com
              </div>
              <div className="text-sm">
                <strong>Phone:</strong> (706) 342-2591
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ShippingPage;
