export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

export const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderComponent = (container, component, place) => {
  const element = component.getElement();
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
