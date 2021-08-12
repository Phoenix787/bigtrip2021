export const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

export const CITIES = ['Амстердам', 'Париж', 'Лондон', 'Эдинбург'];

export const ESC_CODE = 'Escape';

export const OFFERS = [
  {name: 'luggage', description: 'Add luggage', price: 30},
  {name: 'comfort', description: 'Switch to comfort class', price: 100},
  {name: 'meal', description: 'Add meal', price: 15},
  {name: 'seats', description: 'Choose seats', price: 5},
  {name: 'train', description: 'Travel by train', price: 40},
];

export const wordToUpperCase = (str) => {
  return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
};

export const SortType = {
  SORT_EVENT: 'sort-event',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
};
