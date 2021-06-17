
import { createTripAndCostComponent } from './view/trip-and-cost';
import { createNavElement } from './view/navigation';
import { createFiltersElement } from './view/filters';
import { createSortElement } from './view/sort';
import { createTripDayTemplate } from './view/trip-day';
import { createTripEventEditItem } from './view/event-edit';
import { createTripEventItem } from './view/event';
import { generateEvents } from './mock/event';


const TRIP_COUNT = 3;

const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);

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
const daysContainer = `<ul class="trip-days">
											</ul>`;

render(tripEvents, daysContainer);
const siteDaysElement = tripEvents.querySelector('.trip-days');

let tripEventList;

let currentDay = new Date(0).getDate();
let dayCount = 1;
let flag = true;
for(const event of events) {
  if(currentDay !== event.dateTimeStart.getDate()) {
    render(siteDaysElement, createTripDayTemplate(dayCount, event.dateTimeStart));
    tripEventList = siteDaysElement.querySelector('.trip-days__item:last-child .trip-events__list');
    currentDay = event.dateTimeStart.getDate();
    dayCount++;
  }
  if( flag ) {
    render(tripEventList, createTripEventEditItem(event));
    flag = false;
  } else {
    render(tripEventList, createTripEventItem(event));

  }
}


//	events.slice(0,1).forEach((event) => render(tripEventList, createTripEventEditItem(event)));

