import AbstractView from './abstract-view';


export default class TripBoard extends AbstractView {
  constructor(container) {
    super();
    this._container = container; //page-main
  }

  getTemplate() {
  	return this._element.innerHTML;
  }

  getElement() {
    if(!this._element) {
      this._element = this._container.querySelector('.trip-events');
    }
    return this._element;
  }
}
