import { makeTimeHuman } from '../utils/common';
import AbstractView from './abstract-view';

import he from 'he';

// const makeTimeHuman = (date) => {
//   return `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
// };

const humanizeTimeDuration = (duration) => {
  const diffDay = Math.floor(duration / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((duration % 86400000) / 3600000);
  const diffMinutes = Math.round(((duration % 86400000)%3600000) / 60000);
  return `${diffDay > 0 ? `${diffDay}D` : ''}${diffHours > 0 ? `${diffHours}H` : ''}${diffMinutes > 0 ? `${diffMinutes}M` : ''}`;
};

// const getCheckedOffers = (array, object) => {
//   return array.slice().filter((item) => Object.entries(object).filter((it) => it[1] === true).some((it) => {
//     return item.name == it[0];
//   }));
// };


export const createTripEventItem = (event) => {

  const {type: eventType, city, dateTimeStart: startTime, dateTimeEnd: endTime, totalPrice, offers} = event;
  const hourDiff = (endTime.getTime() - startTime.getTime());
  const duration = humanizeTimeDuration(hourDiff);
  const startTimeMarkup = makeTimeHuman(startTime);
  const endTimeMarkup = makeTimeHuman(endTime);
  //const totalPrice = price + offers.reduce((sum, item) => sum + item.price, 0);
  const offersMarkup = offers.map((it) => {
    return (
      it.checked ? `
			<li class="event__offer">
					<span class="event__offer-title">${it.description}</span>
					&plus;
					&euro;&nbsp;<span class="event__offer-price">${it.price}</span>
				 </li>
		` : ''
    );
  }).join('\n');


  return (
    `<li class="trip-events__item">
		<div class="event">
			<div class="event__type">
				<img class="event__type-icon" width="42" height="42" src="${eventType.iconURL}" alt="Event type icon">
			</div>
			<h3 class="event__title">${eventType.name.slice(0,1).toUpperCase()}${eventType.name.slice(1).toLocaleLowerCase()} ${eventType.action} ${he.encode(city)}</h3>

			<div class="event__schedule">
				<p class="event__time">
					<time class="event__start-time" datetime="${startTime}">${startTimeMarkup}</time>
					&mdash;
					<time class="event__end-time" datetime="${endTime}">${endTimeMarkup}</time>
				</p>
				<p class="event__duration">${duration}</p>
			</div>

			<p class="event__price">
				&euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
			</p>

			<h4 class="visually-hidden">Offers:</h4>
			<ul class="event__selected-offers">
				${offersMarkup}
			</ul>

			<button class="event__rollup-btn" type="button">
				<span class="visually-hidden">Open event</span>
			</button>
		</div>
	</li>`
  );
};

export class EventComponent extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventItem(this._event);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

}

