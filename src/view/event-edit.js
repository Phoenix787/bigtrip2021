import { EventTypes } from '../mock/event';
import { wordToUpperCase } from '../const';
import AbstractView from './abstract-view';
import { makeDateHuman } from '../utils/common';
import { isOffering } from '../utils/event';

const createOffersTemplate = (offers) => {
  return offers.map((it, index) => {
    return (`
		<div class="event__offer-selector">
		<input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-${index}" type="checkbox" name="event-offer-${it.name}" ${it.checked ? 'checked': ''}>
		<label class="event__offer-label" for="event-offer-${it.name}-${index}">
			<span class="event__offer-title">${it.description}</span>
			&plus;
			&euro;&nbsp;<span class="event__offer-price">${it.price}</span>
		</label>
	</div>		
		`);
  }).join('\n');
};

const createTypeitemTemplate = (it, index) => {
  return (
    `<div class="event__type-item">
							<input id="event-type-${it.name}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.name}">
							<label class="event__type-label  event__type-label--${it.name}" for="event-type-${it.name}-${index}">${wordToUpperCase(it.name)}</label>
						</div>`
  );
};

const createTypesTemplate = (types) => {
  const transfer = types.filter((type) => type.group === 'Transfer').map(createTypeitemTemplate).join('\n');
  const activity = types.filter((type) =>  type.group == 'Activity').map(createTypeitemTemplate).join('\n');
  return (
    `<fieldset class="event__type-group">
	<legend class="visually-hidden">Transfer</legend>
		${transfer}
	</fieldset>

<fieldset class="event__type-group">
	<legend class="visually-hidden">Activity</legend>
		${activity}
	</fieldset>`
  );
};

//TODO: сделать шаблон для каждого пункта типа поездки

const createTripEventEditItem = (event) => {
  const {type, city: destination, dateTimeStart: startDateTime, dateTimeEnd: endDateTime, offers,  price, isFavorite } = event;
	const hasOffers = offers.length > 0;
  const offersMarkup = createOffersTemplate(offers);
  return (
    `<li class="trip-events__item">
		<form class="event  event--edit" action="#" method="post">
			<header class="event__header">
				<div class="event__type-wrapper">
					<label class="event__type  event__type-btn" for="event-type-toggle-1">
						<span class="visually-hidden">Choose event type</span>
						<img class="event__type-icon" width="17" height="17" src="${type.iconURL}" alt="Event type icon">
					</label>
					<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

					<div class="event__type-list">
						${createTypesTemplate(EventTypes)}
					</div>
				</div>

				<div class="event__field-group  event__field-group--destination">
					<label class="event__label  event__type-output" for="event-destination-1">
						${wordToUpperCase(type.name)} to
					</label>
					<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
					<datalist id="destination-list-1">
						<option value="Amsterdam"></option>
						<option value="Geneva"></option>
						<option value="Chamonix"></option>
					</datalist>
				</div>

				<div class="event__field-group  event__field-group--time">
					<label class="visually-hidden" for="event-start-time-1">
						From
					</label>
					<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${makeDateHuman(startDateTime)}">
					&mdash;
					<label class="visually-hidden" for="event-end-time-1">
						To
					</label>
					<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${makeDateHuman(endDateTime)}">
				</div>

				<div class="event__field-group  event__field-group--price">
					<label class="event__label" for="event-price-1">
						<span class="visually-hidden">Price</span>
						&euro;
					</label>
					<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
				</div>

				<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
				<button class="event__reset-btn" type="reset">Delete</button>

				<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
				<label class="event__favorite-btn" for="event-favorite-1">
					<span class="visually-hidden">Add to favorite</span>
					<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
						<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
					</svg>
				</label>

				<button class="event__rollup-btn" type="button">
					<span class="visually-hidden">Open event</span>
				</button>
			</header>

			<section class="event__details">
				<section class="event__section  event__section--offers">
				${hasOffers ? `
					<h3 class="event__section-title  event__section-title--offers">Offers</h3>

					<div class="event__available-offers">
					${offersMarkup}
					</div>
					` : '' }
				</section>
			</section>
		</form>
	</li>
		`
  );
};

export class EditEventComponent extends AbstractView {
  constructor(event) {
    super();
    this._data = EditEventComponent.parseEventToData(event);

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventEditItem(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditEventComponent.parseDataToEvent(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#event-favorite-1').addEventListener('change', this._favoriteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isOffering: isOffering(event.offers),
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);


    delete data.isOffering;

    return data;
  }

}
