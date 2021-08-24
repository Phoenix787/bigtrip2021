
import { TripInfoComponent } from './view/trip-and-cost';
import { NavComponent } from './view/navigation';
import { FiltersComponent } from './view/filters';
import { generateEvents } from './mock/event';
import { render, RenderPosition } from './utils/render';
import TripController from './controllers/trip-controller';
import PointsModel from './model/points';
import { generateFilters } from './mock/filter';
import FilterModel from './model/filter';
import FilterController from './controllers/filter-controller';
import TripInfoController from './controllers/trip-info-controller';


const TRIP_COUNT = 5;

const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);
console.log(events);
//const filters = generateFilters(events);
const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const filterModel = new FilterModel();
//begin headers
const tripMainContainer = document.querySelector('.trip-main');
const tripInfoController = new TripInfoController(tripMainContainer, pointsModel);
tripInfoController.init();
//render(tripMainContainer, new TripInfoComponent(events), RenderPosition.AFTERBEGIN); // нужно сделать через модель_точек_маршрута, чтобы обновлять стоимость поездки

const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
render(tripControls, new NavComponent(), RenderPosition.AFTERBEGIN);
const filterController = new FilterController(tripControls, filterModel, pointsModel);
filterController.init();
// <-- end

//Begin section main
const pageMain = document.querySelector('.page-main');
//const tripEvents = pageMain.querySelector('.trip-events');
const tripController = new TripController(pageMain, pointsModel, filterModel);
tripController.render();


