import { MenuItem } from '../const';
import AbstractView from './abstract-view';

const createNavElement = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
			<a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-nav-type="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
			<a class="trip-tabs__btn" href="#" data-nav-type="${MenuItem.STATS}">${MenuItem.STATS}</a>
		</nav>`
  );
};

export class NavComponent extends AbstractView {
  constructor() {
    super();

    this._currentMenuItem = MenuItem.TABLE;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavElement();
  }

  _menuClickHandler(evt) {
    if(this._currentMenuItem === evt.target.dataset.navType) {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.navType);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    Array
      .from(this.getElement().querySelectorAll('a'))
      .forEach((it) => it.addEventListener('click', this._menuClickHandler));

  }

  setMenuItem(menuItem) {
    //удалить актив у всех элементов
    Array
      .from(this.getElement().querySelectorAll('a'))
      .forEach((item) => item.classList.remove('trip-tabs__btn--active'));

    const item = this.getElement().querySelector(`[data-nav-type=${menuItem}]`);
    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }
}
