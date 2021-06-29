export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

export const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};

export const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderElement = (container, element, place) => {
  switch(place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }
};

export const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};
