import AbstractView from '../view/abstract-view';

export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

export const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, component, place) => {
  if(container instanceof AbstractView) {
    container = container.getElement();
  }
  if(component instanceof AbstractView) {
    component = component.getElement();
  }
  // const element = component.getElement();
  switch(place) {
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
  }
};

export const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export const replace = (parent, newChild, oldChild) => {
  parent.replaceChild(newChild.getElement(), oldChild.getElement());
};

/**
 *
 * @param {AbstractView} component
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
