import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-4">
              Privacy Policy
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
                  Introduction
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  At Uniquecop AC&B ("we," "our," or "us"), we respect your privacy and are
                  committed to protecting your personal data. This privacy policy explains how we
                  collect, use, and safeguard your information when you visit our website or make
                  purchases from our store.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside text-charcoal-gray/80 space-y-1">
                      <li>Name and contact information (email, phone, address)</li>
                      <li>
                        Payment information (processed securely through our payment providers)
                      </li>
                      <li>Account credentials and preferences</li>
                      <li>Order history and purchase preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-gray mb-2">
                      Automatically Collected Information
                    </h3>
                    <ul className="list-disc list-inside text-charcoal-gray/80 space-y-1">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your purchases</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Information Sharing
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may
                  share your information with:
                </p>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>Service providers who help us operate our business</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Shipping companies for order fulfillment</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Data Security
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. This includes
                  SSL encryption, secure servers, and regular security audits.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Your Rights
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-charcoal-gray/80 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Cookies
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze site traffic, and
                  personalize content. You can control cookie settings through your browser
                  preferences.
                </p>
              </section>

              <Separator className="bg-soft-taupe/30" />

              <section>
                <h2 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                  Contact Us
                </h2>
                <p className="text-charcoal-gray/80 leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please
                  contact us at:
                </p>
                <div className="mt-4 p-4 bg-creamy-beige rounded-lg">
                  <p className="text-charcoal-gray">
                    <strong>Email:</strong> privacy@Uniquecop AC&B.com
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
export default PrivacyPolicyPage;
