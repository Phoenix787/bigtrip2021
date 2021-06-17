import { CITIES } from '../const';
import { OFFERS } from '../const';

const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};
/*TODO: В зависимости от типа
точки маршрута пользователь может выбрать
дополнительные опции (offers).
*/

//тип точки маршрута TODO: переделать структуру массив с объектами и у каждого типа должен быть набор своих услуг
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

// eslint-disable-next-line no-unused-vars
const DefaultEventOffers = {
  'luggage': false,
  'comfort': false,
  'meal': false,
  'seats': false,
  'train': false,
};

// const generateOffers = () => {
// 	return Object.assign({}, DefaultEventOffers, {'luggage': true, 'seats': true});
// };

const generateOffers = (count) => {
  const array = new Array(count).fill('').map(getRandomOffer);
  for(const item of array) {
    item.checked = Math.random() > 0.5;
  }
  return new Set(array);
};

const getRandomOffer = () => {
  return OFFERS[getRandomInteger(0, OFFERS.length)];
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const generateEvent = () => {
  const offers = Array.from(generateOffers(getRandomInteger(0, OFFERS.length)));
  const price = getRandomInteger(10, 200) + offers.slice().filter((it) => {return it.checked === true; }).reduce((acc, it) => acc + it.price, 0);
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
    description: null,
    isFavorite: Math.random() > 0.5,
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill('')
    .map(generateEvent);
};

export { generateEvent, generateEvents };

