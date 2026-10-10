export const BUSINESS = {
  name: 'Cooks & Bakes',
  fullName: 'Cooks & Bakes – Home of Cream & Moist Cakes',
  tagline: 'We don’t just bake cakes… We save birthdays.',
  location: 'Tech Top High, Near Nhyira FM',
  phones: [
    { display: '055 378 2212', local: '0553782212' },
    { display: '020 499 9959', local: '0204999959' },
  ],
  socials: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    handle: 'COOKS & BAKES',
  },
};

// Convert a Ghana local number (0553782212) to wa.me international format (233553782212).
export const toWaNumber = (local) => `233${local.replace(/\D/g, '').replace(/^0/, '')}`;

export const DEFAULT_ORDER_LINE = BUSINESS.phones[0].local;

export const CURRENCY = 'GH₵';

// Serving sizes (people)
export const SIZES = {
  bento: { label: 'Bento', spec: '5" One Flavor', serves: '1–2 people' },
  pancake: { label: 'Pancake Style', spec: '8" One Flavor', serves: '5 people' },
  small: { label: 'Small', spec: '6" Two Flavors', serves: '10–15 people' },
  medium: { label: 'Medium', spec: '8" Two Flavors', serves: '15–20 people' },
  large: { label: 'Large', spec: '8" Three Flavors', serves: '25–35 people' },
};

export const CATEGORIES = [
  {
    id: 'cream',
    name: 'Standard Cream Cakes',
    icon: '🎂',
    blurb: 'Freshly made cream cakes in our signature standard designs.',
    options: [
      { id: 'pancake', label: 'Pancake Style', spec: '8" One Flavor', price: 300, flavors: 1, serves: '5 people' },
      { id: 'small', label: 'Small', spec: '6" Two Flavors', price: 400, flavors: 2, serves: '10–15 people' },
      { id: 'medium', label: 'Medium', spec: '8" Two Flavors', price: 550, flavors: 2, serves: '15–20 people' },
      { id: 'large', label: 'Large', spec: '8" Three Flavors', price: 750, flavors: 3, serves: '25–35 people' },
    ],
    designs: true,
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    icon: '🧁',
    blurb: 'Swirled with cream, perfect for parties and gifting.',
    options: [
      { id: '4', label: '4 pcs', spec: 'Cupcakes', price: 100, flavors: 1 },
      { id: '6', label: '6 pcs', spec: 'Cupcakes', price: 150, flavors: 1 },
      { id: '12', label: '12 pcs', spec: 'Cupcakes', price: 300, flavors: 1 },
      { id: '24', label: '24 pcs', spec: 'Cupcakes', price: 550, flavors: 1 },
    ],
    designs: false,
  },
  {
    id: 'bento',
    name: 'Bento Cake',
    icon: '🍰',
    blurb: 'A cute personal cake with your own message.',
    options: [{ id: 'bento', label: 'Bento', spec: '5" One Flavor', price: 200, flavors: 1, serves: '1–2 people' }],
    designs: false,
  },
  {
    id: 'parfait',
    name: 'Cake Parfait',
    icon: '🥤',
    blurb: 'Layers of cake and cream in a cup.',
    options: [
      { id: 'small', label: 'Small', spec: 'Cake Parfait', price: 60, flavors: 1 },
      { id: 'big', label: 'Big', spec: 'Cake Parfait', price: 100, flavors: 1 },
    ],
    designs: false,
  },
];

export const FLAVORS = [
  'Vanilla',
  'Chocolate',
  'Red Velvet',
  'Mocha',
  'Strawberry',
  'Fruity (Mixed Fruits)',
  'Oreo',
  'Blueberry / Berry',
];

// Express Cake designs SD1–SD8 (photos cropped from the flyer into /public/designs)
export const DESIGNS = [
  { code: 'SD1', name: 'Chocolate Royale', img: '/designs/sd1.jpg' },
  { code: 'SD2', name: 'Red Velvet Bliss', img: '/designs/sd2.jpg' },
  { code: 'SD3', name: 'Mocha Dream', img: '/designs/sd3.jpg' },
  { code: 'SD4', name: 'Choco Love', img: '/designs/sd4.jpg' },
  { code: 'SD5', name: 'Fruity Delight', img: '/designs/sd5.jpg' },
  { code: 'SD6', name: 'Blue Celebration', img: '/designs/sd6.jpg' },
  { code: 'SD7', name: 'Pink Elegance', img: '/designs/sd7.jpg' },
  { code: 'SD8', name: 'Berry Whip', img: '/designs/sd8.jpg' },
];
