const makeTimeHuman = (date) => {
  return `${date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
};

const humanizeTimeDuration = (duration) => {
  const diffDay = Math.floor(duration / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((duration % 86400000) / 3600000);
  const diffMinutes = Math.round(((duration % 86400000)%3600000) / 60000);
  return `${diffDay > 0 ? `${diffDay}D` : ''}${diffHours > 0 ? `${diffHours}H` : ''}${diffMinutes > 0 ? `${diffMinutes}M` : ''}`;
};


export const createTripEventItem = (event) => {

  const {type: eventType, city, dateTimeStart: startTime, dateTimeEnd: endTime, price, offers} = event;
  const hourDiff = (endTime.getTime() - startTime.getTime());
  const duration = humanizeTimeDuration(hourDiff);
  const startTimeMarkup = makeTimeHuman(startTime);
  const endTimeMarkup = makeTimeHuman(endTime);
  const offersMarkup = offers.map((it) => {
    return (
      `
			<li class="event__offer">
					<span class="event__offer-title">${it.description}</span>
					&plus;
					&euro;&nbsp;<span class="event__offer-price">${it.price}</span>
				 </li>
			`
    );
  }).join('\n');


  return (
    `<li class="trip-events__item">
		<div class="event">
			<div class="event__type">
				<img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
			</div>
			<h3 class="event__title">${eventType.slice(0,1).toUpperCase()}${eventType.slice(1).toLocaleLowerCase()} to ${city}</h3>

			<div class="event__schedule">
				<p class="event__time">
					<time class="event__start-time" datetime="${startTime}">${startTimeMarkup}</time>
					&mdash;
					<time class="event__end-time" datetime="${endTime}">${endTimeMarkup}</time>
				</p>
				<p class="event__duration">${duration}</p>
			</div>

			<p class="event__price">
				&euro;&nbsp;<span class="event__price-value">${price}</span>
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
