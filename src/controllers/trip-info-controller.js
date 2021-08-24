//презентер TripInfo

import { remove, render, RenderPosition, replace } from "../utils/render";
import { TripInfoComponent } from "../view/trip-and-cost";

export default class TripInfoController {
	constructor(tripInfoContainer, pointsModel) {
		this._tripInfoContainer = tripInfoContainer;
		this._pointsModel = pointsModel;
		this._tripInfoView = null;

		this._handleModelEvent = this._handleModelEvent.bind(this);

		this._pointsModel.addObserver(this._handleModelEvent);
	}

	init() {
		const points = this._pointsModel.getPoints();

		const prevTripInfoView = this._tripInfoView;

		this._tripInfoView = new TripInfoComponent(points);

		if (prevTripInfoView === null) {
			render(this._tripInfoContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
			return;
		}

		replace(this._tripInfoView, prevTripInfoView);
		remove(prevTripInfoView);

	}

	_handleModelEvent() {
		this.init();
	}
}