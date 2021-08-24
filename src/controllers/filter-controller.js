import { FilterType, UpdateType } from '../const';
import { filter } from '../utils/filter';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { FiltersComponent } from '../view/filters';

export default class FilterController {
  constructor(filterContainer, filterModel, pointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointModel = pointModel;

    this._filterView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterView = this._filterView;

    this._filterView = new FiltersComponent(filters, this._filterModel.getFilter());
    this._filterView.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    if (prevFilterView === null) {
      render(this._filterContainer, this._filterView, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterView, prevFilterView);
    remove(prevFilterView);
  }

  _filterTypeChangeHandler(filterType) {
    if(this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilters() {
    const points = this._pointModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }
}
