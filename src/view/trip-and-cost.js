import { tripInfoTemplate } from './trip';
import { tripInfoCostTemplate } from './trip-cost';
import { MONTHS } from '../const';


export const createTripAndCostComponent = (events) => {
  const title = events.map((it) => it.city).join(' — ');
  const datesStart = events.map((it) => it.dateTimeStart);

  const minStartDay = new Date(Math.min(...datesStart));
  const maxStartDay = new Date(Math.max(...datesStart));

  const tripDates = `${MONTHS[maxStartDay.getMonth()].toLocaleUpperCase()} ${minStartDay.getDay()}–${maxStartDay.getDay()}`;
  const tripCost = events.reduce((sum, it) => sum + it.price, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
			${tripInfoTemplate(title, tripDates)}
			${tripInfoCostTemplate(tripCost)}
		</section>`
  );
};
