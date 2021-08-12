
import { TripInfoComponent } from './view/trip-and-cost';
import { NavComponent } from './view/navigation';
import { FiltersComponent } from './view/filters';
import { generateEvents } from './mock/event';
import { render, RenderPosition } from './utils/render';
import TripController from './controllers/trip-controller';


const TRIP_COUNT = 5;

const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);

//begin headers
const tripMainContainer = document.querySelector('.trip-main');
render(tripMainContainer, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
render(tripControls, new NavComponent(), RenderPosition.AFTERBEGIN);
render(tripControls, new FiltersComponent(), RenderPosition.BEFOREEND);
// <-- end

//Begin section main
const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');
const tripController = new TripController(tripEvents);
tripController.render(events);


