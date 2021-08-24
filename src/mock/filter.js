import { isPointExpired, isPointInFuture } from "../utils/event";

const PointToFilter = {
	everything: (events) => events,
  future: (events) => events.filter((point) => isPointInFuture(point)),
  past: (events) => events.filter((point) => isPointExpired(point)),
}

export const generateFilters = (points) => {
	return Object
	.entries(PointToFilter)
	.map(([filterName, count]) => {
		return {
			name: filterName,
			filterCount: count(points),
		};
	});
}