import { SortType } from '../const';
import { updateItem } from '../utils/common';
import { sortByPrice, sortByTime } from '../utils/event';
import { remove, render, RenderPosition } from '../utils/render';
//import AbstractView from '../view/abstract-view';
import { DaysComponent } from '../view/days';
import { NoPointComponent } from '../view/no-points';
import { SortComponent } from '../view/sort';
import TripBoard from '../view/trip-board';
import { TripDayComponent } from '../view/trip-day';
import PointController from './point-controller';

export default class TripController {
  constructor(container, pointsModel) {
    this._tripEventsContainer = container;

    this._pointsModel = pointsModel;

    this._pointPresenter = {}; //Заведем свойство _pointPresenter, где Trip-презентер будет хранить ссылки на все Point-презентеры.

    this._eventsBoard = new TripBoard(this._tripEventsContainer);
    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = null; //new DaysComponent();
    //this._siteDaysElement = null;

    this._currentSortType = SortType.SORT_EVENT;

    this._handleEventChange = this._handleEventChange.bind(this);
		this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

		this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.SORT_PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);

      case SortType.SORT_TIME:
        return this._pointsModel.getPoints().slice().sort(sortByTime);
    }
    return this._pointsModel.getPoints();
  }

  render() {
    //this._sourcedEvents = this._getPoints().slice();
    this._renderEventsBoard();
  }

  _renderEventsBoard() {

    const isEmpty = this._getPoints().length === 0;
    if(isEmpty) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderDaysComponent();
    this._renderTripsByDay(this._siteDaysElement, this._getPoints());
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._eventsBoard, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._eventsBoard, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysComponent() {
    if(this._daysComponent != null) {
      remove(this._daysComponent);
      this._daysComponent = null;
    }

    this._daysComponent = new DaysComponent();
    render(this._eventsBoard, this._daysComponent, RenderPosition.BEFOREEND);
    //this._siteDaysElement = this._eventsBoard.getElement().querySelector('.trip-days');
  }

  /**
	 *
	 * @param {*} container - this._daysComponent
	 */
  _renderTripsByDay() {
    const points = this._getPoints();
    let tripEventList;
    let currentDay = new Date(0).getDate();
    let dayCount = 1;
    for (const event of points) {
      if (currentDay !== event.dateTimeStart.getDate()) {
        render(this._daysComponent, new TripDayComponent(dayCount, event.dateTimeStart), RenderPosition.BEFOREEND);
        tripEventList = this._daysComponent.getElement().querySelector('.trip-days__item:last-child .trip-events__list');
        currentDay = event.dateTimeStart.getDate();
        dayCount++;
      }
      this._renderTrip(tripEventList, event);
    }
  }

  _renderSortedTrips() {

    render(this._daysComponent, new TripDayComponent('', ''), RenderPosition.BEFOREEND);
    const tripEventList = this._daysComponent.getElement().querySelector('.trip-events__list');
    this._getPoints().forEach((event) => this._renderTrip(tripEventList, event));
  }

  _renderTrip(tripEventList, event) {
    const pointController = new PointController(tripEventList, this._handleEventChange, this._handleModeChange);
    pointController.init(event);
    this._pointPresenter[event.id] = pointController;
  }

  _handleEventChange(userAction, updateType, updated) {
    //здесь будем вызывать обновление модели
		console.log(userAction, updateType, updated);
    //this._pointsModel.setPoints(updateItem(this._getPoints(), updated));
    //this._pointPresenter[updated.id].init(updated);
  }

	_handleModelEvent(updateType, data) {

		console.log(updateType, data);
		
	}

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearEventList() {
    this._renderDaysComponent();

    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }


  _handleSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearEventList();

    this._currentSortType === SortType.SORT_EVENT
      ? this._renderTripsByDay()
      : this._renderSortedTrips();
  }


}

