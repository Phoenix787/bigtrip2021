import { MONTHS } from '../const';

export const createTripDayTemplate = (dayNumber = 1, date = new Date('2019-03-19T11:20')) => {
  return (`
 <li class="trip-days__item  day">
		<div class="day__info">
			<span class="day__counter">${dayNumber}</span>
			<time class="day__date" datetime="${date}">${MONTHS[date.getMonth()]} ${date.getDate()}</time>
		</div>

		<ul class="trip-events__list">
		</ul>
	</li>
	`
);
};
