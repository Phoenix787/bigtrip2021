import AbstractView from "./abstract-view"

export default class Smart extends AbstractView {
	constructor() {
		super();

		this._data = {};

	}

	updateData(update, justUpdating) {
    if(!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );
    console.log(this._data);

    if(justUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }

	_restoreHandlers() {
		throw new Error(`Abstract method. It's should be implemented.`);
	}


}