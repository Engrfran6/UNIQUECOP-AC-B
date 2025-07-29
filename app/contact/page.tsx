'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Clock, Mail, MapPin, MessageCircle, Phone, Send} from 'lucide-react';
import {useState} from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({name: '', email: '', subject: '', message: ''});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-sage-green/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">Contact Us</h1>
            <p className="text-lg text-charcoal-gray/80">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <Card className="bg-sage-green/10 border-sage-green/20">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-12 w-12 text-sage-green mx-auto mb-4" />
                    <h3 className="font-semibold text-charcoal-gray mb-2">Message Sent!</h3>
                    <p className="text-charcoal-gray/70">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-charcoal-gray mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-warm-white border-soft-taupe/30"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-charcoal-gray mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-warm-white border-soft-taupe/30"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-charcoal-gray mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-warm-white border-soft-taupe/30"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal-gray mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-warm-white border-soft-taupe/30"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-accent">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-warm-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-6">
                  Get in Touch
                </h2>
                <p className="text-charcoal-gray/70 mb-8">
                  Have questions about our products, need help with an order, or want to learn more
                  about our story? We're here to help and would love to connect with you.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-warm-white border-soft-taupe/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-sage-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-gray mb-2">Visit Our Studio</h3>
                        <p className="text-charcoal-gray/70">
                          123 Candle Street
                          <br />
                          Artisan District, CA 90210
                          <br />
                          Nigeria
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-warm-white border-soft-taupe/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-dusty-rose/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-dusty-rose" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-gray mb-2">Call Us</h3>
                        <p className="text-charcoal-gray/70">
                          (706) 342-2591
                          <br />
                          <span className="text-sm">Monday - Friday, 9AM - 6PM PST</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-warm-white border-soft-taupe/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-muted-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-gray mb-2">Email Us</h3>
                        <p className="text-charcoal-gray/70">
                          hello@uniquecop.com
                          <br />
                          <span className="text-sm">We respond within 24 hours</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-warm-white border-soft-taupe/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-sage-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal-gray mb-2">Business Hours</h3>
                        <div className="text-charcoal-gray/70 space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-creamy-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-charcoal-gray/70">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-charcoal-gray mb-2">
                How long do your candles burn?
              </h3>
              <p className="text-charcoal-gray/70 text-sm mb-4">
                Our candles typically burn for 45-60 hours, depending on the size and how you care
                for them.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-charcoal-gray mb-2">Do you offer custom scents?</h3>
              <p className="text-charcoal-gray/70 text-sm mb-4">
                Yes! We offer custom scent blending for orders of 12 or more candles. Contact us for
                details.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-charcoal-gray mb-2">What's your return policy?</h3>
              <p className="text-charcoal-gray/70 text-sm mb-4">
                We offer 30-day returns on unused products. See our Returns page for full details.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-charcoal-gray mb-2">
                Do you ship internationally?
              </h3>
              <p className="text-charcoal-gray/70 text-sm mb-4">
                Currently we ship within the US and Ghana. International shipping coming soon!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
