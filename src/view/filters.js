import AbstractView from './abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
	const {type, name, filterCount} = filter;

	return `<div class="trip-filters__filter">
				<input 
				id="filter-${type}" 
				class="trip-filters__filter-input  visually-hidden" 
				type="radio" name="trip-filter" 
				value="${type}" 
				${filterCount === 0 ? 'disabled' : ''} 
				${type === currentFilterType ? 'checked' : ''}>
				<label 
				class="trip-filters__filter-label" 
				for="filter-${type}">${name}</label>
			</div>`;

}

const createFiltersElement = (filters, currentFilterType) => {

	const filtersMarkup = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
			${filtersMarkup}
			<button class="visually-hidden" type="submit">Accept filter</button>
		</form>`
  );
};

export class FiltersComponent extends AbstractView {
  constructor (filters, currentFilterType) {
    super();
    this._filters = filters;
		this._currentFilterType = currentFilterType;

		this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFiltersElement(this._filters, this._currentFilterType);
  }

	_handleFilterTypeChange(evt) {
		evt.preventDefault();
		this._callback.filterChange(evt.target.value);
	}

	setFilterTypeChangeHandler(callback) {
		this._callback.filterChange = callback;
		this.getElement().addEventListener('change', this._handleFilterTypeChange);
	}
}

