import React from 'react';

interface Feature {
  value: string;
  label: string;
}

interface CategoryHeaderProps {
  title: string;
  description: string;
  features?: Feature[];
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({title, description, features = []}) => {
  return (
    <section className="bg-creamy-beige pt-14 pb-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-playfair text-5xl font-bold text-charcoal-gray mb-6">{title}</h1>
          <p className="text-lg text-charcoal-gray/80 mb-8">{description}</p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {features.map((feature, idx) => (
              <div className="space-y-2" key={idx}>
                <div className="text-2xl font-bold text-muted-gold">{feature.value}</div>
                <div className="text-sm text-charcoal-gray/70">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeader;
