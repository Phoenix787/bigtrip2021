import AbstractView from './abstract-view';

const createFilterItemTemplate = (filter) => {
	const {name, filterCount} = filter;

	return `<div class="trip-filters__filter">
				<input 
				id="filter-${name}" 
				class="trip-filters__filter-input  visually-hidden" 
				type="radio" name="trip-filter" 
				value="${name}" 
				${filterCount.length === 0 ? 'disabled' : ''} 
				checked>
				<label 
				class="trip-filters__filter-label" 
				for="filter-${name}">${name}</label>
			</div>`

}

const createFiltersElement = (filters) => {

	const filtersMarkup = filters.map((filter) => createFilterItemTemplate(filter)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
			${filtersMarkup}
			<button class="visually-hidden" type="submit">Accept filter</button>
		</form>`
  );
};

export class FiltersComponent extends AbstractView {
  constructor (filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersElement(this._filters);
  }
}

