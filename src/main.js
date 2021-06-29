
import { TripInfoComponent } from './view/trip-and-cost';
import { NavComponent } from './view/navigation';
import { FiltersComponent } from './view/filters';
import { generateEvents } from './mock/event';
import { renderComponent, RenderPosition } from './utils/render';
import TripController from './controllers/trip-controller';


const TRIP_COUNT = 5;

const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);

const tripMainContainer = document.querySelector('.trip-main');
renderComponent(tripMainContainer, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
renderComponent(tripControls, new NavComponent(), RenderPosition.AFTERBEGIN);
renderComponent(tripControls, new FiltersComponent(), RenderPosition.BEFOREEND);
const pageMain = document.querySelector('.page-main');

const tripEvents = pageMain.querySelector('.trip-events');
const tripController = new TripController(tripEvents);
tripController.render(events);


