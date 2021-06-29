import { tripInfoTemplate } from './trip';
import { tripInfoCostTemplate } from './trip-cost';
import { MONTHS } from '../const';
import AbstractView from './abstract-view';

const getDatesOfTrip = (date1, date2) => {
  const minStartDay = date1; //datesStart[0];
  const maxStartDay = date2; //datesEnd[0];
  return `${MONTHS[minStartDay.getMonth()].toLocaleUpperCase()} ${minStartDay.getDate()} – ${MONTHS[maxStartDay.getMonth()].toLocaleUpperCase()} ${maxStartDay.getDate()}`;
};

const createTripAndCostComponent = (events = []) => {
  const isEmpty = events.length === 0;
  const title = events.length > 3 ? `${events[0].city}... – ...${events[events.length-1].city}`: events.map((it) => it.city).join(' — ');
  const datesStart = events.map((it) => it.dateTimeStart).sort((a, b) => a - b);
  const datesEnd = events.map((it) => it.dateTimeEnd).sort((a, b) => b - a);
  const tripDates = !isEmpty ? getDatesOfTrip(datesStart[0], datesEnd[0]) : '';
  const tripCost = events.reduce((sum, it) => sum + it.price, 0) || 0;

  return (
    `<section class="trip-main__trip-info  trip-info">
			${tripInfoTemplate(title, tripDates)}
			${tripInfoCostTemplate(tripCost)}
		</section>`
  );
};

export class TripInfoComponent extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripAndCostComponent(this._events);
  }
}
