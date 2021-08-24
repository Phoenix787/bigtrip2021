import { CITIES, wordToUpperCase } from '../const';
import { getRandomInteger, makeDateHuman } from '../utils/common';
import { eventOffers, EventTypes, findEventType, isOffering, updateEventPrice } from '../utils/event';
import { generateOffers } from '../mock/event';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import Smart from './smart';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  id: nanoid(),
  type: EventTypes[0],
  city: CITIES[0],
  dateTimeStart: dayjs().toDate(),
  dateTimeEnd: dayjs().add(7, 'd').toDate(),
  offers: [],
  price: 0,
  description: null,
  isFavorite: false,
};

const createOffersTemplate = (offers) => {
  return offers.map((it, index) => {
    return (`
		<div class="event__offer-selector">
		<input class="event__offer-checkbox  visually-hidden" id="event-offer-${it.name}-${index}" type="checkbox" data-offer-name="${it.name}" name="event-offer-${it.name}" ${it.checked ? 'checked': ''}>
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

const createTripEventEditItem = (event) => {
  const {type, city: destination, dateTimeStart: startDateTime, dateTimeEnd: endDateTime, offers,  totalPrice, isFavorite } = event;
  const hasOffers = offers.length > 0;
  const offersMarkup = createOffersTemplate(offers);
  const totalPointPrice = totalPrice;
  //const citiesMarkup = CITIES.map((it) => `<option value="${it}"></option>`).join('\n');
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
						${wordToUpperCase(type.name)} ${type.action}
					</label>
					<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
					<datalist id="destination-list-1">
						${CITIES.map((it) => `<option value="${it}"></option>`).join('\n')}
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
					<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPointPrice}">
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

export class EditEventComponent extends Smart {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EditEventComponent.parseEventToData(event);

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._eventDestinationToggleHandler = this._eventDestinationToggleHandler.bind(this);
    this._startDatePickerChangeHandler = this._startDatePickerChangeHandler.bind(this);
    this._endDatePickerChangeHandler = this._endDatePickerChangeHandler.bind(this);
    this._eventOffersToggle = this._eventOffersToggle.bind(this);

    this._startDatePicker = null;
    this._endDatePicker = null;

    this._setInnerHandlers();
    this._setDatePickers();

  }

  getTemplate() {
    return createTripEventEditItem(this._data);
  }

  removeElement() {
    super.removeElement();
    if(this._startDatePicker !== null) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
    if(this._endDatePicker !== null) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('#event-favorite-1')
      .addEventListener('click', this._favoriteClickHandler);

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._priceChangeHandler);

    Array.from(this.getElement().querySelectorAll('input[name=event-type]'))
      .forEach((it) => it.addEventListener('click', this._eventTypeToggleHandler));

    this.getElement()
      .querySelector('input[name=event-destination')
      .addEventListener('change', this._eventDestinationToggleHandler);

    Array.from(this.getElement()
      .querySelectorAll('.event__offer-checkbox'))
      .forEach((it) => it.addEventListener('change', this._eventOffersToggle));

  }

  _restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteHandler(this._callback.formDelete);
    this.setClickHandler(this._callback.click);
  }

  _setDatePickers() {
    if(this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }
    if(this._endDatePicker) {
      this._endDatePicker.destroy();
      this._endDatePicker = null;
    }

    const startDateElement = this.getElement().querySelector('input[name=event-start-time]');
    this._startDatePicker = flatpickr(startDateElement, {
      enableTime: true,
      time_24hr: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: this._data.dateTimeStart || 'today',
      onClose: this._startDatePickerChangeHandler,
    });

    const endDateElement = this.getElement().querySelector('input[name=event-end-time]');
    this._endDatePicker = flatpickr(
      endDateElement,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        time_24hr: true,
        defaultDate: this._data.dateTimeEnd || 'today',
        onClose: this._endDatePickerChangeHandler,
      },
    );
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditEventComponent.parseDataToEvent(this._data));
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.formDelete(EditEventComponent.parseDataToEvent(this._data));

  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();

    this.updateData({isFavorite: !this._data.isFavorite});

  }

  _priceChangeHandler(evt) {

		const total = parseFloat(evt.target.value);
		const priceWithoutOffers = total - updateEventPrice(this._data.offers);

    this.updateData({
      totalPrice: parseFloat(evt.target.value),
			price: priceWithoutOffers,
    },
    true,
    );
  }

  _eventTypeToggleHandler(evt) {

    this.updateData({
      type: findEventType(evt.target.value),
      offers: Array.from(generateOffers(getRandomInteger(0, eventOffers.length))),
    });
  }

  _eventDestinationToggleHandler(evt) {

    this.updateData({
      city: evt.target.value,
    });

  }

  _startDatePickerChangeHandler([userDate]) {
    this.updateData({
      dateTimeStart: dayjs(userDate).toDate(),
    });
  }

  _endDatePickerChangeHandler([userDate]) {
    this.updateData({
      dateTimeEnd: dayjs(userDate).toDate(),
    });
  }

  _eventOffersToggle(evt) {

    let updatedEventOffers = [];
    let totalPointPrice = 0;
    const index = this._data.offers.findIndex((it) => it.name === evt.target.dataset.offerName);

    if(index >= 0 && this._data.offers[index].checked === true) {
      this._data.offers[index].checked = false;
      updatedEventOffers = this._data.offers;
      totalPointPrice = this._data.price + updateEventPrice(this._data.offers);

    } else {

      this._data.offers[index].checked = true;
      updatedEventOffers = this._data.offers;
      totalPointPrice = this._data.price + updateEventPrice(this._data.offers);

    }

    this.updateData({
      offers: updatedEventOffers,
      totalPrice: totalPointPrice,
    });


  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormDeleteHandler(callback) {
    this._callback.formDelete = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler);
  }

  reset(event) {
    this.updateData(
      EditEventComponent.parseEventToData(event),
    );
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
