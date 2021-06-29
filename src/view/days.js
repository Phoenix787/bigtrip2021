import AbstractView from './abstract-view';

const createTemplate = () => {
  return `<ul class="trip-days">
	</ul>`;
};

export class DaysComponent extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTemplate();
  }
}
