import { FilterType } from "../const";
import Observer from "../utils/observer";


export default class FilterModel extends Observer {
	constructor() {
		super();
		this._activeFilter = FilterType.EVERYTHING;
	}

	setFilter(updateType, filterType) {
		this._activeFilter = filterType;

		this.notify(updateType, filterType);
	}

	getFilter() {
		return this._activeFilter;
	}
}