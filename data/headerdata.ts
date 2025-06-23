export const headerData = {
  candles: {
    title: 'Handcrafted Candles',
    description: `   Each candle is lovingly hand-poured using premium soy wax and natural fragrances. Our
              artisanal process ensures a clean, long-lasting burn that fills your space with
              beautiful scents.`,
    features: [
      {
        value: '100+',
        label: 'Natural Soy Wax',
      },
      {
        value: '45-60',
        label: 'Hours Burn Time',
      },
      {
        value: 'Hand',
        label: 'Poured & Crafted',
      },
    ],
  },

  scents: {
    title: 'Premium Scents',
    description: `Our carefully curated collection of essential oils and fragrance blends are sourced
              from the finest ingredients around the world. Each scent is designed to transform your
              space and elevate your mood.`,
    features: [
      {value: 'Pure', label: 'Essential Oils'},
      {value: 'Therapeutic', label: 'Grade Quality'},
      {value: 'Ethically', label: 'Sourced'},
    ],
  },
  books: {
    title: 'Curated Books & Journals',
    description: `   Thoughtfully selected books that inspire mindful living, creativity, and personal
              growth. Each title complements our philosophy of creating peaceful, intentional
              spaces.`,
    features: [
      {
        value: 'Mindful',
        label: 'Living Guides',
      },
      {
        value: 'Creative',
        label: 'Inspiration',
      },
      {
        value: 'Wellness',
        label: '& Self-Care',
      },
    ],
  },
};
export type HeaderData = typeof headerData;
