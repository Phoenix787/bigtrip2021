import AbstractView from './abstract-view';

export const SortType = {
  SORT_EVENT: 'sort-event',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
};


const createSortElement = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
			<span class="trip-sort__item  trip-sort__item--day">Day</span>

			<div class="trip-sort__item  trip-sort__item--event">
				<input id="${SortType.SORT_EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_EVENT}" checked>
				<label class="trip-sort__btn" for="${SortType.SORT_EVENT}">Event</label>
			</div>

			<div class="trip-sort__item  trip-sort__item--time">
				<input id="${SortType.SORT_TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_TIME}">
				<label class="trip-sort__btn" for="${SortType.SORT_TIME}">
					Time
					<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
						<path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
					</svg>
				</label>
			</div>

			<div class="trip-sort__item  trip-sort__item--price">
				<input id="${SortType.SORT_PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.SORT_PRICE}">
				<label class="trip-sort__btn" for="${SortType.SORT_PRICE}">
					Price
					<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
						<path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
					</svg>
				</label>
			</div>

			<span class="trip-sort__item  trip-sort__item--offers">Offers</span>
		</form>`
  );
};

export class SortComponent extends AbstractView {
  constructor() {
    super();
    this._currentSortType = SortType.SORT_EVENT;
  }

  getTemplate() {
    return createSortElement();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      //	evt.preventDefault();

      if(evt.target.tagName !== 'INPUT') {
        return;
      }

      const sortType = evt.target.value;

      if(this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
