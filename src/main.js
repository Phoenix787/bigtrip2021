
import { createTripAndCostComponent } from './view/trip-and-cost';
import { createNavElement } from './view/navigation';
import { createFiltersElement } from './view/filters';
import { createSortElement } from './view/sort';
import { createTripDays } from './view/trip-days';
import { createTripEventEditItem } from './view/event-edit';
import { createTripEventItem } from './view/event';
import { generateEvents } from './mock/event';


const TRIP_COUNT = 4;

const events = generateEvents(TRIP_COUNT);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};


const tripMainContainer = document.querySelector('.trip-main');

render(tripMainContainer, createTripAndCostComponent(events), 'afterbegin');

const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
render(tripControls, createNavElement(), 'afterbegin');
render(tripControls, createFiltersElement(), 'beforeend');
const tripControlsChildren = tripControls.children;

tripControls.insertBefore(tripControlsChildren[1], tripControlsChildren[0]);

const pageMain = document.querySelector('.page-main');

const tripEvents = pageMain.querySelector('.trip-events');

render(tripEvents, createSortElement());
render(tripEvents, createTripDays());

const tripEventList = tripEvents.querySelector('.trip-events__list');
events.slice(0,1).forEach((event) => render(tripEventList, createTripEventEditItem(event)));

// for(let i = 0; i < TRIP_COUNT; i++) {
//   render(tripEventList, createTripEventItem(events));
// }

events.slice(1).forEach((event) => render(tripEventList, createTripEventItem(event)));

