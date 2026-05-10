export interface Fragrance {
  id: string;
  name: string;
  scentFamily: string;
  moodWord: string;
  moodWordFr: string;
  description: string;
  image: string;
  gradientTop: string;
  gradientBottom: string;
  accentColor: string;
  waveLayers: {
    text: string;
    frequency: number;
    amplitude: number;
    letterSpacing: number;
    yPosition: number;
    weight: number;
  }[];
}

export const fragrances: Fragrance[] = [
  {
    id: 'nocturne',
    name: 'Nocturne',
    scentFamily: 'Oriental · Woody',
    moodWord: 'Mysterious',
    moodWordFr: 'Noir',
    description: 'Black orchid, smoked oud, and a whisper of vanilla. A fragrance for the hours after midnight.',
    image: '/assets/fragrance-nocturne.jpg',
    gradientTop: '#16101E',
    gradientBottom: '#1E1628',
    accentColor: '#5E5568',
    waveLayers: [
      { text: 'Nocturne', frequency: 0.12, amplitude: 28, letterSpacing: 12, yPosition: 0.45, weight: 600 },
      { text: 'parfum', frequency: 0.22, amplitude: 20, letterSpacing: 24, yPosition: 0.52, weight: 400 },
      { text: 'Mysterious', frequency: 0.08, amplitude: 32, letterSpacing: 18, yPosition: 0.62, weight: 500 },
      { text: 'Noir', frequency: 0.16, amplitude: 18, letterSpacing: 32, yPosition: 0.68, weight: 400 },
    ],
  },
  {
    id: 'ember',
    name: 'Ember',
    scentFamily: 'Warm · Spicy',
    moodWord: 'Sensual',
    moodWordFr: 'Chaud',
    description: 'Amber resin, cardamom, and aged sandalwood. The warmth of a fire that never goes out.',
    image: '/assets/fragrance-ember.jpg',
    gradientTop: '#2A1A10',
    gradientBottom: '#352418',
    accentColor: '#8B7A6A',
    waveLayers: [
      { text: 'Ember', frequency: 0.12, amplitude: 28, letterSpacing: 12, yPosition: 0.45, weight: 600 },
      { text: 'parfum', frequency: 0.22, amplitude: 20, letterSpacing: 24, yPosition: 0.52, weight: 400 },
      { text: 'Sensual', frequency: 0.08, amplitude: 32, letterSpacing: 18, yPosition: 0.62, weight: 500 },
      { text: 'Chaud', frequency: 0.16, amplitude: 18, letterSpacing: 32, yPosition: 0.68, weight: 400 },
    ],
  },
  {
    id: 'reverie',
    name: 'Reverie',
    scentFamily: 'Fresh · Floral',
    moodWord: 'Dreamlike',
    moodWordFr: 'Douce',
    description: 'White tea, jasmine, and wet moss after rain. A scent that drifts between memory and imagination.',
    image: '/assets/fragrance-reverie.jpg',
    gradientTop: '#0F1A18',
    gradientBottom: '#152220',
    accentColor: '#5A6E66',
    waveLayers: [
      { text: 'Reverie', frequency: 0.12, amplitude: 28, letterSpacing: 12, yPosition: 0.45, weight: 600 },
      { text: 'parfum', frequency: 0.22, amplitude: 20, letterSpacing: 24, yPosition: 0.52, weight: 400 },
      { text: 'Dreamlike', frequency: 0.08, amplitude: 32, letterSpacing: 18, yPosition: 0.62, weight: 500 },
      { text: 'Douce', frequency: 0.16, amplitude: 18, letterSpacing: 32, yPosition: 0.68, weight: 400 },
    ],
  },
  {
    id: 'lune',
    name: 'Lune',
    scentFamily: 'Clean · Musk',
    moodWord: 'Ethereal',
    moodWordFr: 'Clair',
    description: 'Silver musk, white cedar, and a breath of iris. Moonlight captured in liquid form.',
    image: '/assets/fragrance-lune.jpg',
    gradientTop: '#8E8880',
    gradientBottom: '#6E6860',
    accentColor: '#A8A098',
    waveLayers: [
      { text: 'Lune', frequency: 0.12, amplitude: 28, letterSpacing: 12, yPosition: 0.45, weight: 600 },
      { text: 'parfum', frequency: 0.22, amplitude: 20, letterSpacing: 24, yPosition: 0.52, weight: 400 },
      { text: 'Ethereal', frequency: 0.08, amplitude: 32, letterSpacing: 18, yPosition: 0.62, weight: 500 },
      { text: 'Clair', frequency: 0.16, amplitude: 18, letterSpacing: 32, yPosition: 0.68, weight: 400 },
    ],
  },
];

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: 'perfume' | 'body-ritual';
  overline: string;
}

export const products: Product[] = [
  {
    id: 'nocturne-edp',
    title: 'Nocturne EDP',
    description: 'Black orchid, smoked oud, vanilla. A fragrance for the hours after midnight.',
    price: '$165\u200350ml',
    image: '/assets/product-nocturne.jpg',
    category: 'perfume',
    overline: 'EAU DE PARFUM',
  },
  {
    id: 'ember-edp',
    title: 'Ember EDP',
    description: 'Amber resin, cardamom, aged sandalwood. The warmth of a fire that never goes out.',
    price: '$165\u200350ml',
    image: '/assets/product-ember.jpg',
    category: 'perfume',
    overline: 'EAU DE PARFUM',
  },
  {
    id: 'reverie-edp',
    title: 'Reverie EDP',
    description: 'White tea, jasmine, wet moss. A scent that drifts between memory and imagination.',
    price: '$165\u200350ml',
    image: '/assets/product-reverie.jpg',
    category: 'perfume',
    overline: 'EAU DE PARFUM',
  },
  {
    id: 'lune-edp',
    title: 'Lune EDP',
    description: 'Silver musk, white cedar, iris. Moonlight captured in liquid form.',
    price: '$165\u200350ml',
    image: '/assets/product-lune.jpg',
    category: 'perfume',
    overline: 'EAU DE PARFUM',
  },
  {
    id: 'nocturne-body-oil',
    title: 'Nocturne Body Oil',
    description: 'Silky dry oil infused with the Nocturne scent. Absorbs instantly, lingers for hours.',
    price: '$68\u2003200ml',
    image: '/assets/product-body-oil-nocturne.jpg',
    category: 'body-ritual',
    overline: 'BODY RITUAL',
  },
  {
    id: 'ember-body-scrub',
    title: 'Ember Body Scrub',
    description: 'Warm amber and sandalwood exfoliation. Sugar crystals in a base of shea and argan.',
    price: '$52\u2003200g',
    image: '/assets/product-body-scrub-ember.jpg',
    category: 'body-ritual',
    overline: 'BODY RITUAL',
  },
  {
    id: 'reverie-hand-cream',
    title: 'Reverie Hand Cream',
    description: 'White tea and jasmine hand nourishment. Non-greasy, deeply moisturizing.',
    price: '$38\u200350ml',
    image: '/assets/product-hand-cream-reverie.jpg',
    category: 'body-ritual',
    overline: 'BODY RITUAL',
  },
  {
    id: 'lune-hair-mist',
    title: 'Lune Hair Mist',
    description: 'Silver musk and white cedar hair fragrance. Lightweight, never heavy.',
    price: '$48\u200350ml',
    image: '/assets/product-hair-mist-lune.jpg',
    category: 'body-ritual',
    overline: 'BODY RITUAL',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "The first time I wore Nocturne, someone stopped me on the street to ask what I was wearing. It doesn't smell like perfume — it smells like a memory you can't quite place. I haven't worn anything else in six months.",
    author: 'Elena M., Brooklyn',
  },
  {
    id: '2',
    quote: "Ember is the scent of being held close in winter. My partner says it smells like 'us' now — like home. The body oil is just as beautiful. I use it after every bath and the scent stays on my skin until morning.",
    author: 'James L., London',
  },
  {
    id: '3',
    quote: 'I bought Reverie on impulse after smelling it at a boutique in Paris. Three weeks later, I went back and bought the entire line. It\'s like walking through a garden at dawn — quiet, green, impossibly beautiful.',
    author: 'Sofia R., Paris',
  },
];
