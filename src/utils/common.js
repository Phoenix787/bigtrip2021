import dayjs from 'dayjs';

export const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};

export const updateItem = (items, updated) => {
  const index = items.findIndex((item) => item.id === updated.id);
  if(index === -1) {
    return items;
  }
  return [...items.slice(0, index), updated, items.slice(index + 1)];
};

export const makeTimeHuman = (date) => {
  return dayjs(date).format('HH:mm').toString();
  //return `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
};

export const makeDateHuman = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};
