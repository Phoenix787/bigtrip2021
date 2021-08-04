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
