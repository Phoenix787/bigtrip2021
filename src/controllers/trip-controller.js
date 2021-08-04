import { updateItem } from '../utils/common';
import { render, RenderPosition } from '../utils/render';
//import AbstractView from '../view/abstract-view';
import { DaysComponent } from '../view/days';
import { NoPointComponent } from '../view/no-points';
import { SortComponent, SortType } from '../view/sort';
import { TripDayComponent } from '../view/trip-day';
import PointController from './point-controller';

export default class TripController {
  constructor(container) {
    this._tripEventsContainer = container;
    this._pointPresenter = {}; //Заведем свойство _pointPresenter, где Trip-презентер будет хранить ссылки на все Point-презентеры.

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
    this._siteDaysElement = null;

    this._handleEventChange = this._handleEventChange.bind(this);
  }

  render(events) {
    this._events = events.slice();

    this._renderEventsBoard();


  }

  _renderEventsBoard() {

    const container = this._tripEventsContainer;
    const isEmpty = this._events.length === 0;
    if(isEmpty) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderSort();
    this._renderDaysComponent();
    this._renderTripsByDay(this._siteDaysElement, this._events);
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(this._events, sortType);
      sortType === SortType.SORT_EVENT
        ?  this._renderTripsByDay(this._siteDaysElement, sortedEvents)
        : this._renderSortedTrips(this._siteDaysElement, sortedEvents);
      // siteDaysElement.innerHTML = '';
      // renderComponent(siteDaysElement, new TripDayComponent('', ''), RenderPosition.BEFOREEND);
      // const tripEventList = siteDaysElement.querySelector('.trip-events__list');
      // sortedEvents.forEach((event) => renderTrip(tripEventList, event));
    });

    render(this._tripEventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderDaysComponent() {
    render(this._tripEventsContainer, this._daysComponent, RenderPosition.BEFOREEND);
    this._siteDaysElement = this._tripEventsContainer.querySelector('.trip-days');
  }

  _renderTripsByDay(container, events) {
    container.innerHTML = '';
    let tripEventList;
    let currentDay = new Date(0).getDate();
    let dayCount = 1;
    for (const event of events) {
      if (currentDay !== event.dateTimeStart.getDate()) {
        render(container, new TripDayComponent(dayCount, event.dateTimeStart), RenderPosition.BEFOREEND);
        tripEventList = container.querySelector('.trip-days__item:last-child .trip-events__list');
        currentDay = event.dateTimeStart.getDate();
        dayCount++;
      }
      this._renderTrip(tripEventList, event);
    }
  }

  _renderSortedTrips(container, trips) {
    container.innerHTML = '';
    render(container, new TripDayComponent('', ''), RenderPosition.BEFOREEND);
    const tripEventList = container.querySelector('.trip-events__list');
    trips.forEach((event) => this._renderTrip(tripEventList, event));
  }

  _renderTrip(tripEventList, event) {
    const pointController = new PointController(tripEventList, this._handleEventChange);
    pointController.init(event);
    this._pointPresenter[event.id] = pointController;
  }

  _handleEventChange(updated) {
    this._events = updateItem(this._events, updated);
    this._pointPresenter[updated.id].init(updated);
		console.log(updated); //TODO: убрать потом! это для проверки что отрабатывает обработчик
  }

  _clearEventList() {
    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();
  switch (sortType) {
    case SortType.SORT_EVENT:
      sortedEvents = showingEvents;
      break;
    case SortType.SORT_PRICE:
      sortedEvents = showingEvents.sort((a, b) => a.price - b.price);
      break;
    case SortType.SORT_TIME:
      sortedEvents = showingEvents.sort((a, b) => (a.dateTimeEnd - a.dateTimeStart) - (b.dateTimeEnd - b.dateTimeStart));
      break;
  }
  return sortedEvents;
};
