import {Card, CardContent} from '@/components/ui/card';
import {Award, Heart, Lightbulb, Users} from 'lucide-react';
import Image from 'next/image';

const OurStoryPage = () => {
  const milestones = [
    {
      year: '2018',
      title: 'The Spark',
      description:
        'Precious started making candles in her kitchen, seeking natural alternatives to synthetic fragrances.',
      image: '/placeholder.svg?height=300&width=400',
    },
    {
      year: '2019',
      title: 'First Market',
      description: 'Debuted at the local farmers market with 12 candle varieties and a dream.',
      image: '/placeholder.svg?height=300&width=400',
    },
    {
      year: '2020',
      title: 'Online Launch',
      description:
        'Launched our online store during the pandemic, bringing comfort to homes everywhere.',
      image: '/placeholder.svg?height=300&width=400',
    },
    {
      year: '2021',
      title: 'Expanding Horizons',
      description: 'Added wax melts and curated books to create complete wellness experiences.',
      image: '/placeholder.svg?height=300&width=400',
    },
    {
      year: '2022',
      title: 'Sustainable Focus',
      description: 'Committed to 100% sustainable packaging and carbon-neutral shipping.',
      image: '/placeholder.svg?height=300&width=400',
    },
    {
      year: '2024',
      title: 'Community Growth',
      description:
        'Serving over 10,000 customers worldwide and supporting local artisan partnerships.',
      image: '/placeholder.svg?height=300&width=400',
    },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Crafted with Love',
      description:
        'Every product is hand-poured and crafted with attention to detail and genuine care for our customers.',
      color: 'bg-dusty-rose',
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Mindful Innovation',
      description:
        'We continuously seek new ways to enhance wellness through thoughtful product development.',
      color: 'bg-muted-gold',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community First',
      description:
        'Building meaningful connections with our customers and supporting local communities.',
      color: 'bg-sage-green',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Promise',
      description:
        'Using only premium materials and maintaining the highest standards in everything we create.',
      color: 'bg-charcoal-gray',
    },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="bg-creamy-beige py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">Our Story</h1>
            <p className="text-xl text-charcoal-gray/80 mb-8">
              What started as a simple desire for natural, beautiful candles has grown into a
              mission to bring mindful moments and authentic wellness into homes around the world.
            </p>
            <div className="relative mx-auto max-w-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Uniquecop candle workshop"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Precious, Founder of Uniquecop"
                  width={400}
                  height={500}
                  className="rounded-lg shadow-lg mx-auto"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
                    Meet Precious
                  </h2>
                  <h3 className="text-xl text-sage-green font-medium mb-6">
                    Founder & Chief Candle Enthusiast
                  </h3>
                </div>
                <div className="space-y-4 text-charcoal-gray/80">
                  <p>
                    "I never imagined that my search for a simple, natural candle would lead to this
                    incredible journey. It all began in 2018 when I couldn't find candles that met
                    my standards for quality, fragrance, and sustainability."
                  </p>
                  <p>
                    "After months of experimenting in my kitchen, testing different wax blends and
                    fragrance combinations, I created my first candle that truly captured what I was
                    looking for – pure, long-lasting fragrance in a beautifully crafted package."
                  </p>
                  <p>
                    "Today, Uniquecop represents everything I believe in: authentic craftsmanship,
                    mindful living, and the power of scent to transform our daily experiences. Every
                    candle we make carries this same passion and attention to detail."
                  </p>
                </div>
                <div className="bg-sage-green/10 p-6 rounded-lg">
                  <p className="italic text-charcoal-gray/70">
                    "Our mission is simple: to create products that bring peace, joy, and mindful
                    moments into your everyday life."
                  </p>
                  <div className="mt-3 text-right">
                    <span className="font-playfair text-lg text-charcoal-gray">
                      — Precious Okeke
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-creamy-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">
              Our Journey
            </h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              From a kitchen experiment to a beloved brand, here's how Uniquecop has grown and
              evolved over the years.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                  <div className="lg:w-1/2">
                    <Image
                      src={milestone.image || '/placeholder.svg'}
                      alt={milestone.title}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <div className="inline-block bg-sage-green text-warm-white px-4 py-2 rounded-full font-bold text-lg mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-charcoal-gray mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-charcoal-gray/70 text-lg leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">Our Values</h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-warm-white border-soft-taupe/20 text-center group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-warm-white`}>
                    {value.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal-gray/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-sage-green/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-4">Our Team</h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              Meet the passionate individuals who bring Uniquecop to life every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Emma Thompson"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-1">
                  Emma Thompson
                </h3>
                <p className="text-sage-green font-medium mb-3">Head of Production</p>
                <p className="text-sm text-charcoal-gray/70">
                  Ensures every candle meets our exacting quality standards with 8+ years of artisan
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Amaka Chibogu"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-1">
                  Amaka Chibogu
                </h3>
                <p className="text-sage-green font-medium mb-3">Fragrance Curator</p>
                <p className="text-sm text-charcoal-gray/70">
                  Develops our signature scent blends and sources the finest natural fragrances
                  worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-6">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Lisa Okeke"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-1">
                  Lisa Okeke
                </h3>
                <p className="text-sage-green font-medium mb-3">Customer Experience</p>
                <p className="text-sm text-charcoal-gray/70">
                  Dedicated to ensuring every customer feels valued and supported throughout their
                  Uniquecop journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Looking Forward Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold text-charcoal-gray mb-6">
              Looking Forward
            </h2>
            <p className="text-lg text-charcoal-gray/80 mb-8">
              As we continue to grow, our commitment to quality, sustainability, and community
              remains unwavering. We're excited about the future and grateful to have you as part of
              our story.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-sage-green">10,000+</div>
                <div className="text-sm text-charcoal-gray/70">Happy Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-dusty-rose">50+</div>
                <div className="text-sm text-charcoal-gray/70">Unique Fragrances</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-muted-gold">100%</div>
                <div className="text-sm text-charcoal-gray/70">Sustainable Packaging</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default OurStoryPage;
