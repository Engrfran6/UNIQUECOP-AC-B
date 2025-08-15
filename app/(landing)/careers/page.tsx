import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Briefcase, Clock, GraduationCap, Heart, MapPin, Users} from 'lucide-react';

const CareersPage = () => {
  const openPositions = [
    {
      title: 'Senior Candle Artisan',
      department: 'Production',
      location: 'Austin, TX',
      type: 'Full-time',
      description:
        'Lead our candle-making team and develop new product lines with expertise in soy wax formulation and fragrance blending.',
      requirements: [
        '5+ years candle making experience',
        'Knowledge of fragrance oils',
        'Leadership skills',
      ],
    },
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description:
        'Drive our digital marketing strategy across social media, email, and content marketing to grow our brand presence.',
      requirements: [
        '3+ years digital marketing',
        'E-commerce experience',
        'Content creation skills',
      ],
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Customer Service',
      location: 'Austin, TX',
      type: 'Full-time',
      description:
        'Provide exceptional customer service and help customers find the perfect products for their needs.',
      requirements: ['2+ years customer service', 'Excellent communication', 'Product knowledge'],
    },
    {
      title: 'Sustainability Coordinator',
      department: 'Operations',
      location: 'Austin, TX',
      type: 'Full-time',
      description:
        'Lead our sustainability initiatives and help us achieve our environmental goals while maintaining product quality.',
      requirements: [
        'Environmental science background',
        'Project management',
        'Data analysis skills',
      ],
    },
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-dusty-rose" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness stipend',
    },
    {
      icon: <Clock className="h-6 w-6 text-dusty-rose" />,
      title: 'Work-Life Balance',
      description: 'Flexible hours, remote work options, and unlimited PTO policy',
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-dusty-rose" />,
      title: 'Growth & Learning',
      description:
        'Professional development budget, conference attendance, and skill-building workshops',
    },
    {
      icon: <Users className="h-6 w-6 text-dusty-rose" />,
      title: 'Team Culture',
      description: 'Inclusive environment, team retreats, and collaborative workspace',
    },
  ];

  return (
    <div className="min-h-screen bg-creamy-beige">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dusty-rose/10 to-sage-green/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-charcoal-gray mb-6">
            Join Our
            <span className="text-dusty-rose block">Uniquecop AC&B Family</span>
          </h1>
          <p className="text-xl text-charcoal-gray/80 max-w-3xl mx-auto leading-relaxed">
            We're looking for passionate individuals who share our commitment to creating beautiful,
            sustainable products that bring joy and tranquility to people's lives.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-charcoal-gray/70 max-w-2xl mx-auto">
              At Uniquecop AC&B, we believe in nurturing our team just as much as we nurture our
              products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-warm-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold text-lg text-charcoal-gray mb-3">{benefit.title}</h3>
                  <p className="text-charcoal-gray/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-warm-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-charcoal-gray/70">
              Find your perfect role and help us create moments of tranquility
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="bg-warm-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="font-semibold text-xl text-charcoal-gray">
                          {position.title}
                        </h3>
                        <Badge variant="secondary" className="bg-dusty-rose/15 text-dusty-rose">
                          {position.department}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-charcoal-gray/70">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.type}
                        </div>
                      </div>

                      <p className="text-charcoal-gray/80 mb-4 leading-relaxed">
                        {position.description}
                      </p>

                      <div>
                        <h4 className="font-medium text-charcoal-gray mb-2">Requirements:</h4>
                        <ul className="text-sm text-charcoal-gray/70 space-y-1">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-sage-green rounded-full mt-2 flex-shrink-0"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:ml-8">
                      <Button asChild className="btn-accent w-full lg:w-auto">
                        <a
                          href={`mailto:careers@uniquecop.com?subject=Application for ${position.title}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-8">
              Our Culture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="font-semibold text-xl text-charcoal-gray mb-3">Creativity</h3>
                <p className="text-charcoal-gray/70">
                  We encourage innovative thinking and creative problem-solving in everything we do.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-charcoal-gray mb-3">Sustainability</h3>
                <p className="text-charcoal-gray/70">
                  Environmental responsibility is at the core of our mission and daily operations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-charcoal-gray mb-3">Community</h3>
                <p className="text-charcoal-gray/70">
                  We support each other and our local community through collaboration and giving
                  back.
                </p>
              </div>
            </div>

            <div className="bg-sage-green/10 rounded-2xl p-8">
              <p className="text-lg text-charcoal-gray/80 italic leading-relaxed">
                "Working at Uniquecop AC&B isn't just a job – it's being part of a mission to bring
                more peace, beauty, and sustainability into the world. Every day, we're creating
                products that help people find moments of tranquility in their busy lives."
              </p>
              <div className="mt-4 text-charcoal-gray/70">
                — Sarah Chen, Head of Product Development
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CareersPage;
