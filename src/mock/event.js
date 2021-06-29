import { CITIES } from '../const';
import { cloneDeep } from 'lodash';
import { getRandomInteger } from '../utils/common';


/*TODO: В зависимости от типа
точки маршрута пользователь может выбрать
дополнительные опции (offers).
*/

const Action = {
  TO: 'to',
  IN: 'in',
};

const Group = {
  TRANSFER: 'Transfer',
  ACTIVITY: 'Activity',
};

const EventTypes = [
  {name: 'taxi', iconURL: 'img/icons/taxi.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'bus', iconURL: 'img/icons/bus.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'train', iconURL: 'img/icons/train.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'ship', iconURL: 'img/icons/ship.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'drive', iconURL: 'img/icons/drive.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'transport', iconURL: 'img/icons/transport.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'flight', iconURL: 'img/icons/flight.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'check-in', iconURL: 'img/icons/check-in.png', group: Group.ACTIVITY, action: Action.IN},
  {name: 'sightseeing', iconURL: 'img/icons/sightseeing.png', group: Group.ACTIVITY, action: Action.IN},
  {name: 'restaurant', iconURL: 'img/icons/restaurant.png', group: Group.ACTIVITY, action: Action.IN},
];

// const eventTypes = [
//   'taxi',
//   'train',
//   'ship',
//   'transport',
//   'drive',
//   'flight',
//   'check-in',
//   'sightseeing',
//   'restaurant',
// ];

const eventOffers = [
  {name: 'luggage', description: 'Add luggage', price: 30},
  {name: 'comfort', description: 'Switch to comfort class', price: 100},
  {name: 'meal', description: 'Add meal', price: 15},
  {name: 'seats', description: 'Choose seats', price: 5},
  {name: 'train', description: 'Travel by train', price: 40},
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

//генерируем массив (размером - случайное число) доп.опций и в этом массиве случайным образом делаем checked позиций
//будем считать что это массив доп опций, которые привязаны к типу маршрута
const generateOffers = (count) => {
  const array = new Array(count).fill('').map(getRandomOffer);
  for(const item of array) {
    item.checked = Math.random() > 0.5;
  }
  return new Set(array);
};

const getRandomOffer = () => {
  return cloneDeep(eventOffers[getRandomInteger(0, eventOffers.length)]);
};

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


const generateEvent = () => {
  const offers = Array.from(generateOffers(getRandomInteger(0, eventOffers.length)));
  const price = getRandomInteger(10, 200) + offers.slice().filter((it) => {return it.checked === true; }).reduce((acc, it) => acc + it.price, 0);
  const today = new Date();
  const deadline = new Date();
  today.setDate(today.getDate() - 7);
  deadline.setDate(today.getDate() + 7);
  const dateTimeStart = generateRandomDate(today, deadline);

  return {
    type: EventTypes[getRandomInteger(0, EventTypes.length)],
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

export { generateEvent, generateEvents, EventTypes };

