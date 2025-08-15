import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {AlertCircle, CheckCircle, Clock, Mail, Package, RotateCcw} from 'lucide-react';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-dusty-rose/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">
              Returns & Exchanges
            </h1>
            <p className="text-lg text-charcoal-gray/80">
              We want you to love your purchase. If you're not completely satisfied, we're here to
              help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Return Policy Overview */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Our Return Policy
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-sage-green/20 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-sage-green" />
                  </div>
                  <CardTitle className="text-xl">30-Day Window</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-charcoal-gray/70">
                    Returns accepted within 30 days of delivery
                  </p>
                  <Badge className="bg-sage-green text-warm-white">Full Refund</Badge>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-dusty-rose/20 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-dusty-rose" />
                  </div>
                  <CardTitle className="text-xl">Original Condition</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-charcoal-gray/70">
                    Items must be unused and in original packaging
                  </p>
                  <Badge className="bg-dusty-rose text-warm-white">Required</Badge>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted-gold/20 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-8 w-8 text-muted-gold" />
                  </div>
                  <CardTitle className="text-xl">Easy Process</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-charcoal-gray/70">Simple online return process</p>
                  <Badge className="bg-muted-gold text-warm-white">Hassle-Free</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What Can Be Returned */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              What Can Be Returned
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-sage-green" />
                    <CardTitle className="text-sage-green">Returnable Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-charcoal-gray/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Unused candles in original packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Unopened wax melts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Books in new condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Gift sets (if unopened)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-sage-green mt-0.5 flex-shrink-0" />
                      <span>Accessories and holders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-dusty-rose" />
                    <CardTitle className="text-dusty-rose">Non-Returnable Items</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-charcoal-gray/70">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5 flex-shrink-0" />
                      <span>Used or burned candles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5 flex-shrink-0" />
                      <span>Opened wax melts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5 flex-shrink-0" />
                      <span>Custom or personalized items</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5 flex-shrink-0" />
                      <span>Sale items marked "Final Sale"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-dusty-rose mt-0.5 flex-shrink-0" />
                      <span>Items damaged by misuse</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              How to Return an Item
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sage-green font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-gray mb-2">Start Your Return</h3>
                  <p className="text-charcoal-gray/70 mb-3">
                    Contact us at returns@uniquecop.com or call (706) 342-2591 with your order
                    number and reason for return.
                  </p>
                  <Button className="btn-accent">Start Return Process</Button>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-dusty-rose/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-dusty-rose font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-gray mb-2">
                    Get Return Authorization
                  </h3>
                  <p className="text-charcoal-gray/70">
                    We'll email you a return authorization number (RMA) and prepaid shipping label
                    within 24 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-muted-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-gold font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-gray mb-2">Package & Ship</h3>
                  <p className="text-charcoal-gray/70">
                    Pack items securely in original packaging, attach the prepaid label, and drop
                    off at any UPS location.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sage-green font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-gray mb-2">Receive Refund</h3>
                  <p className="text-charcoal-gray/70">
                    Once we receive and inspect your return, we'll process your refund within 3-5
                    business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Exchanges */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Exchanges
            </h2>

            <Card className="bg-warm-white border-soft-taupe/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <RotateCcw className="h-12 w-12 text-sage-green mx-auto mb-4" />
                  <h3 className="font-semibold text-charcoal-gray mb-2">Easy Exchanges</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-charcoal-gray mb-3">Size/Scent Exchanges</h4>
                    <ul className="space-y-2 text-sm text-charcoal-gray/70">
                      <li>• Same product, different size or scent</li>
                      <li>• No additional shipping charges</li>
                      <li>• Price difference applies if applicable</li>
                      <li>• Must be within 30-day window</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-charcoal-gray mb-3">Defective Items</h4>
                    <ul className="space-y-2 text-sm text-charcoal-gray/70">
                      <li>• Immediate replacement or refund</li>
                      <li>• No return shipping required</li>
                      <li>• Contact us with photos of defect</li>
                      <li>• 60-day window for defective items</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Refund Information */}
          <div className="mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-8 text-center">
              Refund Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Processing Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-charcoal-gray/70">Credit Card:</span>
                    <span className="text-sm font-medium">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-charcoal-gray/70">PayPal:</span>
                    <span className="text-sm font-medium">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-charcoal-gray/70">Bank Transfer:</span>
                    <span className="text-sm font-medium">5-7 business days</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle>Refund Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-charcoal-gray/70 text-sm">
                    Refunds are processed to the original payment method used for the purchase.
                  </p>
                  <ul className="space-y-1 text-xs text-charcoal-gray/60">
                    <li>• Original shipping costs are non-refundable</li>
                    <li>• Return shipping is free with our prepaid label</li>
                    <li>• Gift card purchases are refunded as store credit</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="text-center bg-creamy-beige rounded-lg p-8">
            <Mail className="h-12 w-12 text-sage-green mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
              Need Help with a Return?
            </h3>
            <p className="text-charcoal-gray/70 mb-6">
              Our customer service team is here to make your return process as smooth as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <div className="text-sm">
                <strong>Email:</strong> returns@uniquecop.com
              </div>
              <div className="text-sm">
                <strong>Phone:</strong> (706) 342-2591
              </div>
            </div>
            <p className="text-xs text-charcoal-gray/60">
              Customer service hours: Monday-Friday 9AM-6PM PST
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ReturnsPage;
