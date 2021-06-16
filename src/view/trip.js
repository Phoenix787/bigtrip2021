export const tripInfoTemplate = (str = 'Amsterdam &mdash; Chamonix &mdash; Geneva', date = 'Mar 18&nbsp;&mdash;&nbsp;20') => {
  return (
    `<div class="trip-info__main">
			<h1 class="trip-info__title">${str}</h1>

			<p class="trip-info__dates">${date}</p>
		</div>`
  );
};

