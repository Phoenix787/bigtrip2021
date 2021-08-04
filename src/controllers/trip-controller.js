import { ESC_CODE } from '../const';
import { render, RenderPosition, replace } from '../utils/render';
//import AbstractView from '../view/abstract-view';
import { DaysComponent } from '../view/days';
import { EventComponent } from '../view/event';
import { EditEventComponent } from '../view/event-edit';
import { NoPointComponent } from '../view/no-points';
import { SortComponent, SortType } from '../view/sort';
import { TripDayComponent } from '../view/trip-day';

// const renderTrip = (tripEventList, event) => {

//   //	console.log(tripEventList instanceof AbstractView);

//   const tripEvent = new EventComponent(event);
//   const editTripEvent = new EditEventComponent(event);

//   const replaceEventToEdit = () => {
//     replace(tripEventList, editTripEvent, tripEvent);
//   };

//   const replaceEditToEvent = () => {
//     replace(tripEventList, tripEvent, editTripEvent);
//   };

//   const onEscKeyDown = (evt) => {
//     const isEsc = evt.code === ESC_CODE;

//     if(isEsc) {
//       replaceEditToEvent();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };

//   render(tripEventList, tripEvent, RenderPosition.BEFOREEND);
//   tripEvent.setClickHandler(() => {
//     replaceEventToEdit();
//     document.addEventListener('keydown', replaceEditToEvent);
//   });

//   editTripEvent.setClickHandler(() => {
//     replaceEditToEvent();
//   });

//   editTripEvent.setFormSubmitHandler(() => {
//     replaceEditToEvent();
//     document.removeEventListener('keydown', onEscKeyDown);

//   });

// };

export default class TripController {
  constructor(container) {
    this._tripEventsContainer = container;

    this._noPointComponent = new NoPointComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();
    this._siteDaysElement = null;
  }

  render(events) {
    this._events = events.slice();
    const container = this._tripEventsContainer;
    const isEmpty = events.length === 0;
    if(isEmpty) {
      render(container, this._noPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderSort();
    this._renderDaysComponent();

    this._renderTripsByDay(this._siteDaysElement, events);

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

    render(tripEventList, tripEvent, RenderPosition.BEFOREEND);
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
