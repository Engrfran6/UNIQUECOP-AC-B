'use client';

import {Card, CardContent} from '@/components/ui/card';
import {ChevronLeft, ChevronRight, Star} from 'lucide-react';
import {useEffect, useState} from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Okoro',
    location: 'Lagos, NG',
    rating: 5,
    text: "The Vanilla Amber candle has completely transformed my evening routine. The scent is absolutely divine and lasts for hours. I've already ordered three more!",
    product: 'Vanilla Amber Candle',
    avatar: '/placeholder.svg?height=60&width=60',
  },
  {
    id: 2,
    name: 'Michael Owen',
    location: 'Ph, NG',
    rating: 5,
    text: 'I was skeptical about essential oils, but the Zen Garden blend has become essential for my meditation practice. The quality is outstanding.',
    product: 'Zen Garden Scent',
    avatar: '/placeholder.svg?height=60&width=60',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Austin, TX',
    rating: 5,
    text: "The Art of Slow Living book came at the perfect time in my life. It's beautifully written and has helped me find peace in the chaos of daily life.",
    product: 'The Art of Slow Living',
    avatar: '/placeholder.svg?height=60&width=60',
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Seattle, WA',
    rating: 5,
    text: "Lumina's candles burn so cleanly and evenly. You can tell they're made with care and quality ingredients. The Rose Garden candle is my favorite!",
    product: 'Rose Garden Candle',
    avatar: '/placeholder.svg?height=60&width=60',
  },
  {
    id: 5,
    name: 'Lisa Park',
    location: 'Chicago, IL',
    rating: 5,
    text: 'The customer service is as amazing as the products. My order arrived beautifully packaged and the Lavender Dreams scent helps me sleep so much better.',
    product: 'Lavender Dreams Scent',
    avatar: '/placeholder.svg?height=60&width=60',
  },
  {
    id: 6,
    name: 'James Wilson',
    location: 'Miami, FL',
    rating: 5,
    text: "I've tried many candle brands, but Lumina is in a league of its own. The burn time is incredible and the scents are perfectly balanced.",
    product: 'Sandalwood Serenity',
    avatar: '/placeholder.svg?height=60&width=60',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Get visible testimonials (current + next 2 for desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-warm-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal-gray mb-4">Testimonials</h2>
          <h3 className="text-xl font-semibold text-sage-green mb-2">Customer Reviews</h3>
          <p className="text-charcoal-gray/70 max-w-2xl mx-auto">
            What Our Satisfied Clients Are Saying
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop View - 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className={`bg-creamy-beige border-soft-taupe/20 transition-all duration-300 ${
                  index === 0 ? 'scale-105 shadow-lg' : 'scale-100'
                }`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-muted-gold text-muted-gold" />
                    ))}
                  </div>
                  <p className="text-charcoal-gray/80 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sage-green font-semibold">
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-gray">{testimonial.name}</div>
                      <div className="text-sm text-charcoal-gray/60">{testimonial.location}</div>
                      <div className="text-xs text-sage-green">{testimonial.product}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View - 1 card */}
          <div className="md:hidden">
            <Card className="bg-creamy-beige border-soft-taupe/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-muted-gold text-muted-gold" />
                  ))}
                </div>
                <p className="text-charcoal-gray/80 mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sage-green font-semibold">
                      {testimonials[currentIndex].name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal-gray">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-charcoal-gray/60">
                      {testimonials[currentIndex].location}
                    </div>
                    <div className="text-xs text-sage-green">
                      {testimonials[currentIndex].product}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              // variant="outline"
              // size="icon"
              onClick={goToPrevious}
              className="rounded-full border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white">
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-sage-green' : 'bg-sage-green/30'
                  }`}
                />
              ))}
            </div>

            <button
              // variant="outline"
              // size="icon"
              onClick={goToNext}
              className="rounded-full border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-charcoal-gray/70 mb-4">Join thousands of satisfied customers</p>
          <button className="btn-accent">
            <a href="/">Shop Now</a>
          </button>
        </div>
      </div>
    </section>
  );
}
