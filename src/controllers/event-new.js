//TODO: Написать презентер формы добавления нового события

import { nanoid } from "nanoid";
import { UpdateType, UserAction } from "../const";
import { remove, render, RenderPosition } from "../utils/render";
import EditEventComponent from "../view/event-edit";


export default class EventNewController {
	constructor(eventContailner, onChangeData) {
		this._eventContainer = eventContailner;
		this._onChangeData = onChangeData;

		this._eventComponent = null;


		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleDeleteClick = this._handleDeleteClick.bind(this);
		this._onEscKeydownHandler = this._onEscKeydownHandler.bind(this);
	}

	init() {

		if(this._eventComponent !== null) {
			return;
		}

		this._eventComponent = new EditEventComponent();
		this._eventComponent.setFormSubmitHandler(this._handleFormSubmit);
		this._eventComponent.setFormDeleteHandler(this._handleDeleteClick);

		render(this._eventContainer, this._eventComponent, RenderPosition.AFTERBEGIN);

		document.addEventListener('keydown', this._onEscKeydownHandler);
	}

	destroy() {

		if(this._eventComponent === null) {
			return;
		}

		remove(this._eventComponent);
		this._eventComponent = null;

		document.removeEventListener('keydown', this._onEscKeydownHandler);

	}

	_handleFormSubmit(event) {
		this._onChangeData(
			UserAction.ADD_EVENT,
			UpdateType.MINOR,
			Object.assign({id: nanoid()}, event),
		);
	}

	_handleDeleteClick() {
			this.destroy();
	}

	_onEscKeydownHandler(evt) {
			if (evt.code === 'Escape') {
				this.destroy();
			}
	}
}