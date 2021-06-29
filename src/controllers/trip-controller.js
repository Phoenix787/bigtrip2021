import { ESC_CODE } from '../const';
import { renderComponent, RenderPosition, replace } from '../utils/render';
import { DaysComponent } from '../view/days';
import { EventComponent } from '../view/event';
import { EditEventComponent } from '../view/event-edit';
import { NoPointComponent } from '../view/no-points';
import { SortComponent, SortType } from '../view/sort';
import { TripDayComponent } from '../view/trip-day';

const renderTrip = (tripEventList, event) => {
  const tripEvent = new EventComponent(event);
  const editTripEvent = new EditEventComponent(event);

  const replaceEventToEdit = () => {
    replace(tripEventList, editTripEvent, tripEvent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventList, tripEvent, editTripEvent);
  };

  const onEscKeyDown = (evt) => {
    const isEsc = evt.code === ESC_CODE;

    if(isEsc) {
      replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  renderComponent(tripEventList, tripEvent, RenderPosition.BEFOREEND);
  tripEvent.setClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener('keydown', replaceEditToEvent);
  });

  editTripEvent.setClickHandler(() => {
    replaceEditToEvent();
  });

  editTripEvent.setFormSubmitHandler(() => {
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);

  });

};

const renderTripsByDay = (container, events) => {
  container.innerHTML = '';
  let tripEventList;
  let currentDay = new Date(0).getDate();
  let dayCount = 1;
  for (const event of events) {
    if (currentDay !== event.dateTimeStart.getDate()) {
      renderComponent(container, new TripDayComponent(dayCount, event.dateTimeStart), RenderPosition.BEFOREEND);
      tripEventList = container.querySelector('.trip-days__item:last-child .trip-events__list');
      currentDay = event.dateTimeStart.getDate();
      dayCount++;
    }
    renderTrip(tripEventList, event);
  }
};

const renderSortedTrips =(container, trips) => {
  container.innerHTML = '';
  renderComponent(container, new TripDayComponent('', ''), RenderPosition.BEFOREEND);
  const tripEventList = container.querySelector('.trip-events__list');
  trips.forEach((event) => renderTrip(tripEventList, event));
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
  }

  render(events) {
    const container = this._container;
    const isEmpty = events.length === 0;
    if(isEmpty) {
      renderComponent(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    renderComponent(container, this._sortComponent, RenderPosition.BEFOREEND);

    renderComponent(container, this._daysComponent, RenderPosition.BEFOREEND);
    const siteDaysElement = container.querySelector('.trip-days');

    renderTripsByDay(siteDaysElement, events);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);
      sortType === SortType.SORT_EVENT
        ?  renderTripsByDay(siteDaysElement, sortedEvents)
        : renderSortedTrips(siteDaysElement, sortedEvents);
      // siteDaysElement.innerHTML = '';
      // renderComponent(siteDaysElement, new TripDayComponent('', ''), RenderPosition.BEFOREEND);
      // const tripEventList = siteDaysElement.querySelector('.trip-events__list');
      // sortedEvents.forEach((event) => renderTrip(tripEventList, event));
    });

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
