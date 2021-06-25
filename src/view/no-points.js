import AbstractView from './abstract-view';

const createTemplate = () => {
  return (`<p class="trip-events__msg">
	Click New Event to create your first point
	</p>`);
};

export class NoPointComponent extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTemplate();
  }
}
