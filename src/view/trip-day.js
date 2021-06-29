import { MONTHS } from '../const';
import AbstractView from './abstract-view';

const createTripDayTemplate = (dayNumber, date) => {
  return `<li class="trip-days__item  day">
		<div class="day__info">
			<span class="day__counter">${dayNumber}</span>
			<time class="day__date" datetime="${date}">${typeof date === Object ? `${MONTHS[date.getMonth()]} ${date.getDate()}` : ''}</time>
		</div>

		<ul class="trip-events__list">
		</ul>
	</li>`;
};

export class TripDayComponent extends AbstractView {
  constructor(dayCount, eventDueDate) {
    super();
    this._dayCount = dayCount;
    this._eventDueDate = eventDueDate;
  }

  getTemplate() {
    return createTripDayTemplate(this._dayCount, this._eventDueDate);
  }


}
