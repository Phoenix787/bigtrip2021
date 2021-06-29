import { createElement } from '../utils/common';

export default class AbstractView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    //здесь нужна конкретная реализация
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
