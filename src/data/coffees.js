// Image files live in public/media so they are easy to replace.
export const coffees = [
  {
    id: 'caffe-mocha',
    name: 'Caffe Mocha',
    subtitle: 'Chocolate & milk',
    category: 'Mocha',
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    image: '/media/caffe-mocha.jpg',
    description:
      'Espresso with chocolate and steamed milk, finished with a layer of foam. A little richer than a latte. Available hot or iced.',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    subtitle: 'Espresso & milk',
    category: 'Flat White',
    price: 3.53,
    rating: 4.8,
    reviews: 186,
    image: '/media/flat-white.jpg',
    description:
      'Espresso with steamed milk and a thin layer of microfoam. Less milk than a latte, with a stronger coffee flavour. Available hot or iced.',
  },
  {
    id: 'caffe-latte',
    name: 'Caffe Latte',
    subtitle: 'Steamed milk',
    category: 'Latte',
    price: 4.25,
    rating: 4.8,
    reviews: 154,
    image: '/media/caffe-latte.jpg',
    description:
      'Espresso with plenty of steamed milk and a light layer of foam. A mild, creamy cup. Available hot or iced.',
  },
  {
    id: 'americano',
    name: 'Americano',
    subtitle: 'Black coffee',
    category: 'Americano',
    price: 3.25,
    rating: 4.8,
    reviews: 122,
    image: '/media/americano.jpg',
    description:
      'Espresso topped with water for a longer black coffee. Served without milk. Available hot or iced.',
  },
];

export const categories = [
  'All Coffee',
  'Favourites',
  'Latte',
  'Americano',
  'Mocha',
  'Flat White',
];

export const sizes = ['S', 'M', 'L'];

export function getCoffeePrice(coffee, size = 'M') {
  const sizeDifference = { S: -0.5, M: 0, L: 0.75 };
  return Math.round((coffee.price + sizeDifference[size]) * 100) / 100;
}

export function formatPrice(price) {
  return `$ ${price.toFixed(2)}`;
}
