import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Droplets, Heart, Leaf, Recycle, TreePine} from 'lucide-react';

const SustainabilityPage = () => {
  const commitments = [
    {
      icon: TreePine,
      title: 'Carbon Neutral Shipping',
      description: 'All our shipments are carbon neutral through verified offset programs.',
      status: 'Active',
    },
    {
      icon: Recycle,
      title: '100% Recyclable Packaging',
      description: 'Our packaging is made from recycled materials and is fully recyclable.',
      status: 'Active',
    },
    {
      icon: Droplets,
      title: 'Sustainable Sourcing',
      description: 'We source our wax and oils from sustainable, ethical suppliers.',
      status: 'Active',
    },
    {
      icon: Leaf,
      title: 'Zero Waste Production',
      description: 'Working towards zero waste in our manufacturing process.',
      status: 'In Progress',
    },
  ];

  const impactNumbers = [
    {number: '50,000+', label: 'Trees planted through partnerships'},
    {number: '95%', label: 'Reduction in plastic packaging'},
    {number: '100%', label: 'Renewable energy in production'},
    {number: '25%', label: 'Carbon footprint reduction since 2020'},
  ];

  const goals2025 = [
    'Achieve 100% plastic-free packaging',
    'Plant 100,000 trees through customer partnerships',
    'Reduce carbon footprint by 50%',
    'Launch refillable candle program',
    'Partner with 10 local environmental organizations',
  ];

  return (
    <div className="min-h-screen bg-creamy-beige">
      {/* Hero Section */}
      <section className="bg-sage-green text-warm-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16" />
          </div>
          <h1 className="font-playfair text-5xl font-bold mb-6">
            Our Commitment to Sustainability
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            At Uniquecop AC&B, we believe that creating beautiful moments shouldn't come at the cost
            of our planet. Every candle, scent, and book is crafted with environmental
            responsibility at its core.
          </p>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Our Environmental Commitments
            </h2>
            <p className="text-charcoal-gray/70 text-lg max-w-2xl mx-auto">
              We've made concrete commitments to reduce our environmental impact and create a more
              sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <Card key={index} className="bg-warm-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <commitment.icon className="h-8 w-8 text-sage-green" />
                    <Badge
                      variant={commitment.status === 'Active' ? 'default' : 'secondary'}
                      className={
                        commitment.status === 'Active' ? 'bg-sage-green' : 'bg-dusty-rose'
                      }>
                      {commitment.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-charcoal-gray">{commitment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal-gray/70">{commitment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 bg-warm-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Our Impact So Far
            </h2>
            <p className="text-charcoal-gray/70 text-lg">
              Real numbers that show our commitment to making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactNumbers.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-sage-green mb-2">{item.number}</div>
                <div className="text-charcoal-gray/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 Goals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
                Our 2025 Goals
              </h2>
              <p className="text-charcoal-gray/70 text-lg">
                We're not stopping here. These are our ambitious goals for the next year.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals2025.map((goal, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-warm-white rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-sage-green rounded-full flex items-center justify-center text-warm-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-charcoal-gray">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-charcoal-gray text-warm-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 text-dusty-rose" />
          <h2 className="font-playfair text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-warm-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Every purchase you make supports our sustainability initiatives. Together, we can create
            a more beautiful world while enjoying the moments that matter most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-sage-green hover:bg-sage-green/90 text-warm-white px-8 py-3 rounded-lg font-medium transition-colors">
              Shop Sustainable Products
            </a>
            <a
              href="/contact"
              className="border border-warm-white/30 hover:bg-warm-white/10 text-warm-white px-8 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;

// import {Card, CardContent} from '@/components/ui/card';
// import {Award, Droplets, Heart, Leaf, Recycle, TreePine} from 'lucide-react';

// const SustainabilityPage = () => {
//   const commitments = [
//     {
//       icon: <Leaf className="h-8 w-8 text-sage-green" />,
//       title: '100% Natural Ingredients',
//       description:
//         'All our candles are made with pure soy wax and natural essential oils, free from harmful chemicals and toxins.',
//     },
//     {
//       icon: <Recycle className="h-8 w-8 text-sage-green" />,
//       title: 'Sustainable Packaging',
//       description:
//         'We use recyclable glass containers and biodegradable packaging materials to minimize our environmental impact.',
//     },
//     {
//       icon: <TreePine className="h-8 w-8 text-sage-green" />,
//       title: 'Carbon Neutral Shipping',
//       description:
//         'We offset 100% of our shipping emissions through verified carbon offset programs and tree planting initiatives.',
//     },
//     {
//       icon: <Droplets className="h-8 w-8 text-sage-green" />,
//       title: 'Water Conservation',
//       description:
//         'Our production process uses 40% less water than traditional candle making through innovative techniques.',
//     },
//     {
//       icon: <Heart className="h-8 w-8 text-sage-green" />,
//       title: 'Ethical Sourcing',
//       description:
//         'We partner with fair-trade suppliers and support local communities where our ingredients are sourced.',
//     },
//     {
//       icon: <Award className="h-8 w-8 text-sage-green" />,
//       title: 'Certified B-Corp',
//       description:
//         'We meet the highest standards of social and environmental performance, accountability, and transparency.',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-creamy-beige">
//       {/* Hero Section */}
//       <section className="relative py-20 bg-gradient-to-br from-sage-green/10 to-dusty-rose/10">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="font-playfair text-5xl md:text-6xl font-bold text-charcoal-gray mb-6">
//             Our Commitment to
//             <span className="text-sage-green block">Sustainability</span>
//           </h1>
//           <p className="text-xl text-charcoal-gray/80 max-w-3xl mx-auto leading-relaxed">
//             At Uniquecop AC&B, we believe that creating beautiful moments shouldn't come at the cost
//             of our planet. Every candle, scent, and book is crafted with environmental
//             responsibility at its core.
//           </p>
//         </div>
//       </section>

//       {/* Our Commitments */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
//               Our Environmental Commitments
//             </h2>
//             <p className="text-lg text-charcoal-gray/70 max-w-2xl mx-auto">
//               We're dedicated to making a positive impact through every aspect of our business
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {commitments.map((commitment, index) => (
//               <Card
//                 key={index}
//                 className="bg-warm-white border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardContent className="p-8 text-center">
//                   <div className="flex justify-center mb-6">{commitment.icon}</div>
//                   <h3 className="font-semibold text-xl text-charcoal-gray mb-4">
//                     {commitment.title}
//                   </h3>
//                   <p className="text-charcoal-gray/70 leading-relaxed">{commitment.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Impact Numbers */}
//       <section className="py-20 bg-sage-green/5">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
//               Our Impact in Numbers
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-sage-green mb-2">50,000+</div>
//               <div className="text-charcoal-gray/70">Trees Planted</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-sage-green mb-2">100%</div>
//               <div className="text-charcoal-gray/70">Renewable Energy</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-sage-green mb-2">75%</div>
//               <div className="text-charcoal-gray/70">Waste Reduction</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-sage-green mb-2">25+</div>
//               <div className="text-charcoal-gray/70">Fair Trade Partners</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Future Goals */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-8 text-center">
//               Our 2025 Goals
//             </h2>
//             <div className="space-y-6">
//               <div className="flex items-start gap-4">
//                 <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0"></div>
//                 <div>
//                   <h3 className="font-semibold text-charcoal-gray mb-2">
//                     Carbon Negative Operations
//                   </h3>
//                   <p className="text-charcoal-gray/70">
//                     Achieve carbon negative status by removing more CO2 from the atmosphere than we
//                     produce.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0"></div>
//                 <div>
//                   <h3 className="font-semibold text-charcoal-gray mb-2">Zero Waste to Landfill</h3>
//                   <p className="text-charcoal-gray/70">
//                     Eliminate all waste sent to landfills through recycling, composting, and
//                     circular design.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0"></div>
//                 <div>
//                   <h3 className="font-semibold text-charcoal-gray mb-2">
//                     100% Regenerative Ingredients
//                   </h3>
//                   <p className="text-charcoal-gray/70">
//                     Source all ingredients from regenerative agriculture that improves soil health
//                     and biodiversity.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SustainabilityPage;
