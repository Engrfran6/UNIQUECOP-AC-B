import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 bg-creamy-beige">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-playfair text-5xl font-bold text-charcoal-gray">
                Our Story
              </h1>
              <p className="text-lg text-charcoal-gray/80">
                Founded in 2019, UNIQUECOP AC&B began as a passion project in a
                small studio apartment. What started with a simple desire to
                create beautiful, natural candles has grown into a mindful
                lifestyle brand dedicated to bringing peace and tranquility into
                everyday life.
              </p>
              <p className="text-charcoal-gray/70">
                Every product we create is infused with intention, crafted with
                care, and designed to help you create moments of calm in your
                busy world.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/about/about_img.webp?height=500&width=600"
                alt="Our founder crafting candles"
                width={600}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Our Values
            </h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              Everything we do is guided by our commitment to quality,
              sustainability, and mindful living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-muted-gold/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-muted-gold/80 rounded-full"></div>
                </div>
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-3">
                  Handcrafted Quality
                </h3>
                <p className="text-charcoal-gray/70">
                  Every candle is hand-poured with premium soy wax and natural
                  fragrances, ensuring the highest quality and longest burn
                  time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage-green/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-sage-green/80 rounded-full"></div>
                </div>
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-3">
                  Sustainable Practices
                </h3>
                <p className="text-charcoal-gray/70">
                  We use eco-friendly materials, recyclable packaging, and
                  partner with suppliers who share our commitment to
                  environmental responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-white border-soft-taupe/20 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-dusty-rose/15 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-dusty-rose/80 rounded-full"></div>
                </div>
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-3">
                  Mindful Living
                </h3>
                <p className="text-charcoal-gray/70">
                  Our curated books and thoughtful product combinations
                  encourage intentional living and moments of peaceful
                  reflection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-creamy-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Our Process
            </h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              From sourcing the finest materials to the final hand-finished
              product, every step is carefully considered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Source",
                description:
                  "We carefully select premium soy wax and natural fragrances from trusted suppliers.",
              },
              {
                step: "02",
                title: "Blend",
                description:
                  "Each scent is expertly blended in small batches to ensure consistency and quality.",
              },
              {
                step: "03",
                title: "Pour",
                description:
                  "Candles are hand-poured with precision, ensuring even distribution and perfect finish.",
              },
              {
                step: "04",
                title: "Cure",
                description:
                  "We allow proper curing time for optimal scent throw and clean burning.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-muted-gold mb-3">
                  {item.step}
                </div>
                <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal-gray/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">
              Meet Our Team
            </h2>
            <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
              The passionate individuals behind every UNIQUECOP AC&B product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Precious Okeke",
                role: "Founder & Head Candle Maker",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Precious's passion for aromatherapy and sustainable living inspired the creation of UNIQUECOP AC&B.",
              },
              {
                name: "Amaka O. Kalu",
                role: "Scent Curator",
                image: "/placeholder.svg?height=300&width=300",
                bio: "With 15 years in fragrance development, Marcus creates our signature scent blends.",
              },
              {
                name: "Emeka Nnaji",
                role: "Book Curator & Content Creator",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Luna carefully selects books that align with our mindful living philosophy.",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="bg-warm-white border-soft-taupe/20 text-center"
              >
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-playfair text-xl font-bold text-charcoal-gray mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sage-green font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-charcoal-gray/70 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
