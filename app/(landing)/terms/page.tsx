import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-4">
              Terms of Service
            </h1>
            <p className="text-charcoal-gray/70 text-lg">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <Card className="bg-warm-white border-soft-taupe/20">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Agreement to Terms
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  By accessing and using Uniquecop AC&B's website and services, you accept and agree
                  to be bound by the terms and provision of this agreement. If you do not agree to
                  abide by the above, please do not use this service.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Use License
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of Uniquecop AC&B's
                  materials for personal, non-commercial transitory viewing only. This is the grant
                  of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Product Information
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  We strive to provide accurate product descriptions, images, and pricing. However,
                  we do not warrant that product descriptions or other content is accurate,
                  complete, reliable, current, or error-free. Colors may vary due to monitor
                  settings and lighting conditions.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Orders and Payment
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Order Acceptance</h3>
                    <p className="text-charcoal-gray/80">
                      All orders are subject to acceptance and availability. We reserve the right to
                      refuse or cancel any order for any reason at any time.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Pricing</h3>
                    <p className="text-charcoal-gray/80">
                      Prices are subject to change without notice. We reserve the right to modify
                      prices at any time prior to accepting an order.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Payment</h3>
                    <p className="text-charcoal-gray/80">
                      Payment must be received before shipment of goods. We accept major credit
                      cards and PayPal.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Shipping and Returns
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Shipping</h3>
                    <p className="text-charcoal-gray/80">
                      We ship to addresses within the Nigeria and internationally. Shipping costs
                      and delivery times vary by location and shipping method selected.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Returns</h3>
                    <p className="text-charcoal-gray/80">
                      Items may be returned within 45 days of purchase in original condition.
                      Customer is responsible for return shipping costs unless the item was
                      defective or incorrectly shipped.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  User Accounts
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate,
                  complete, and current. You are responsible for safeguarding your account
                  credentials and for all activities under your account.
                </p>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One account per person</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Prohibited Uses
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules,
                    laws, or local ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual
                    property rights of others
                  </li>
                  <li>
                    To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                    discriminate
                  </li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Disclaimer
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  The information on this website is provided on an "as is" basis. To the fullest
                  extent permitted by law, this Company excludes all representations, warranties,
                  conditions and terms whether express or implied, statutory or otherwise.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  In no event shall Uniquecop AC&B or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to use materials on
                  Uniquecop AC&B's website.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Contact Information
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-creamy-beige rounded-lg">
                  <p className="text-charcoal-gray">
                    <strong>Email:</strong> legal@Uniquecop AC&B.com
                  </p>
                  <p className="text-charcoal-gray">
                    <strong>Address:</strong> 123 Candle Street, Artisan City, AC 12345
                  </p>
                  <p className="text-charcoal-gray">
                    <strong>Phone:</strong> (706) 342-2591
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
