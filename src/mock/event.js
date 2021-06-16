
const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};
/*TODO: В зависимости от типа
точки маршрута пользователь может выбрать
дополнительные опции (offers).
*/
const TYPES = [
  'taxi',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const CITIES = ['Амстердам', 'Париж', 'Лондон', 'Эдинбург'];

const OFFERS = [
  {name: 'luggage', description: 'Add luggage', price: 30},
  {name: 'comfort', description: 'Switch to comfort class', price: 100},
  {name: 'meal', description: 'Add meal', price: 15},
  {name: 'seats', description: 'Choose seats', price: 5},
  {name: 'train', description: 'Travel by train', price: 40},
];

const generateOffers = (count) => {
  return new Set(new Array(count).fill('').map(getRandomOffer));
};

const getRandomOffer = () => {
  return OFFERS[getRandomInteger(0, OFFERS.length)];
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const generateEvent = () => {
  const offers = Array.from(generateOffers(getRandomInteger(1, 5)));
  const price = offers.reduce((sum, it)=> sum + it.price, 0);
  const today = new Date();
  const deadline = new Date();
  today.setDate(today.getDate() - 7);
  deadline.setDate(today.getDate() + 7);
  const dateTimeStart = generateRandomDate(today, deadline);

  return {
    type: TYPES[getRandomInteger(0, TYPES.length)],
    city: CITIES[getRandomInteger(0, CITIES.length-1)],
    dateTimeStart,
    dateTimeEnd: generateRandomDate(dateTimeStart, deadline),
    offers,
    price,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill('')
    .map(generateEvent);
};

export { generateEvent, generateEvents };

