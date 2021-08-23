import { SortType } from '../const';
import AbstractView from './abstract-view';

const createSortElement = (currentSortType) => {

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
			<span class="trip-sort__item  trip-sort__item--day">Day</span>

			<div class="trip-sort__item  trip-sort__item--event">
				<input id="${SortType.SORT_EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.SORT_EVENT}" value="${SortType.SORT_EVENT}" ${currentSortType === SortType.SORT_EVENT ? 'checked' : ''}>
				<label class="trip-sort__btn" for="${SortType.SORT_EVENT}">Event</label>
			</div>

			<div class="trip-sort__item  trip-sort__item--time">
				<input id="${SortType.SORT_TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.SORT_TIME}" value="${SortType.SORT_TIME}" ${currentSortType === SortType.SORT_TIME ? 'checked' : ''}>
				<label class="trip-sort__btn" for="${SortType.SORT_TIME}">
					Time
					<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
						<path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
					</svg>
				</label>
			</div>

			<div class="trip-sort__item  trip-sort__item--price">
				<input id="${SortType.SORT_PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SortType.SORT_PRICE}" value="${SortType.SORT_PRICE}" ${currentSortType === SortType.SORT_PRICE ? 'checked' : ''}>
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
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

  }

  getTemplate() {
    return createSortElement(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  _sortTypeChangeHandler(evt) {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
  	this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {

    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);

  }
}
