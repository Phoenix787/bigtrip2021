
import { NavComponent } from './view/navigation';
import { generateEvents } from './mock/event';
import { render, RenderPosition } from './utils/render';
import TripController from './controllers/trip-controller';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import FilterController from './controllers/filter-controller';
import TripInfoController from './controllers/trip-info-controller';


const TRIP_COUNT = 5;

const handleMenuClick = (menuItem) => {
  console.log(menuItem);
};


const events = generateEvents(TRIP_COUNT).sort((a, b) => a.dateTimeStart - b.dateTimeStart);

const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const filterModel = new FilterModel();
//begin headers
const tripMainContainer = document.querySelector('.trip-main');
const tripInfoController = new TripInfoController(tripMainContainer, pointsModel);
tripInfoController.init();

const siteMenuComponent = new NavComponent();
siteMenuComponent.setMenuClickHandler(handleMenuClick);
const tripControls = tripMainContainer.querySelector('.trip-main__trip-controls');
render(tripControls, siteMenuComponent, RenderPosition.AFTERBEGIN);

const filterController = new FilterController(tripControls, filterModel, pointsModel);
filterController.init();
// <-- end

//Begin section main
const pageMain = document.querySelector('.page-main');
//const tripEvents = pageMain.querySelector('.trip-events');
const tripController = new TripController(pageMain, pointsModel, filterModel);
tripController.render();

const newEventBtn = tripMainContainer.querySelector('.trip-main__event-add-btn');

newEventBtn.addEventListener('click', (evt) => {
	evt.preventDefault();
	tripController.createEvent();
})


