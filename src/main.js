
import { TripInfoComponent } from './view/trip-and-cost';
import { NavComponent } from './view/navigation';
import { FiltersComponent } from './view/filters';
import { SortComponent } from './view/sort';
import { TripDayComponent } from './view/trip-day';
import { EditEventComponent } from './view/event-edit';
import { EventComponent } from './view/event';
import { generateEvents } from './mock/event';
import { createElement, renderElement, RenderPosition } from './utils/common';
import { NoPointComponent } from './view/no-points';
import { ESC_CODE } from './const';


const TRIP_COUNT = 5;

const renderTrip = (tripEventList, event) => {
  const tripEvent = new EventComponent(event);
  const editTripEvent = new EditEventComponent(event);

  const replaceEventToEdit = () => {
    tripEventList.replaceChild(editTripEvent.getElement(), tripEvent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventList.replaceChild(tripEvent.getElement(), editTripEvent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEsc = evt.code === ESC_CODE;

    if(isEsc) {
      replaceEditToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  renderElement(tripEventList, tripEvent.getElement(), RenderPosition.BEFOREEND);
  const eventRollUpButton = tripEvent.getElement().querySelector('.event__rollup-btn');
  eventRollUpButton.addEventListener('click', () => {
    replaceEventToEdit();
    document.addEventListener('keydown', replaceEditToEvent);
  });

  const editRollUpButton = editTripEvent.getElement().querySelector('.event__rollup-btn');
  editRollUpButton.addEventListener('click', () => {
    replaceEditToEvent();
  });

  const editEventForm = editTripEvent.getElement().querySelector('form');
  editEventForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener('keydown', onEscKeyDown);

  });

};

const renderBoard = (tripEvents, events) => {
  const isEmpty = events.length === 0;
  if(isEmpty) {
    renderElement(tripEvents, new NoPointComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  renderElement(tripEvents, new SortComponent().getElement(),RenderPosition.BEFOREEND);
  const daysContainer = createElement('<ul class="trip-days"></ul>');

  renderElement(tripEvents, daysContainer, RenderPosition.BEFOREEND);
  const siteDaysElement = tripEvents.querySelector('.trip-days');

  let tripEventList;

  let currentDay = new Date(0).getDate();
  let dayCount = 1;
  for (const event of events) {
    if (currentDay !== event.dateTimeStart.getDate()) {
      renderElement(siteDaysElement, new TripDayComponent(dayCount, event.dateTimeStart).getElement(), RenderPosition.BEFOREEND);
      tripEventList = siteDaysElement.querySelector('.trip-days__item:last-child .trip-events__list');
      currentDay = event.dateTimeStart.getDate();
      dayCount++;
    }
    renderTrip(tripEventList, event);
  }
};

const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);

const tripMainContainer = document.querySelector('.trip-main');
renderElement(tripMainContainer, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);

const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
renderElement(tripControls, new NavComponent().getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripControls, new FiltersComponent().getElement(), RenderPosition.BEFOREEND);
const pageMain = document.querySelector('.page-main');

const tripEvents = pageMain.querySelector('.trip-events');
renderBoard(tripEvents, events);

// renderElement(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
// const daysContainer = createElement(`<ul class="trip-days">
// 											</ul>`);

// renderElement(tripEvents, daysContainer, RenderPosition.BEFOREEND);
// const siteDaysElement = tripEvents.querySelector('.trip-days');

// let tripEventList;

// let currentDay = new Date(0).getDate();
// let dayCount = 1;
// let flag = true;
// for(const event of events) {
//   if(currentDay !== event.dateTimeStart.getDate()) {
//     render(siteDaysElement, createTripDayTemplate(dayCount, event.dateTimeStart));
//     tripEventList = siteDaysElement.querySelector('.trip-days__item:last-child .trip-events__list');
//     currentDay = event.dateTimeStart.getDate();
//     dayCount++;
//   }
//   if( flag ) {
//     render(tripEventList, createTripEventEditItem(event));
//     flag = false;
//   } else {
//     render(tripEventList, createTripEventItem(event));

//   }
// }


//	events.slice(0,1).forEach((event) => render(tripEventList, createTripEventEditItem(event)));

