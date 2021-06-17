import { tripInfoTemplate } from './trip';
import { tripInfoCostTemplate } from './trip-cost';
import { MONTHS } from '../const';


export const createTripAndCostComponent = (events) => {
  const title = events.length > 3 ? `${events[0].city}... – ...${events[events.length-1].city}`: events.map((it) => it.city).join(' — ');
  const datesStart = events.map((it) => it.dateTimeStart);

  const minStartDay = new Date(Math.min(...datesStart));
  const maxStartDay = new Date(Math.max(...datesStart));

  const tripDates = `${MONTHS[minStartDay.getMonth()].toLocaleUpperCase()} ${minStartDay.getDay()} – ${MONTHS[maxStartDay.getMonth()].toLocaleUpperCase()} ${maxStartDay.getDay()}`;
  const tripCost = events.reduce((sum, it) => sum + it.price, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
			${tripInfoTemplate(title, tripDates)}
			${tripInfoCostTemplate(tripCost)}
		</section>`
  );
};
