import { ESC_CODE } from '../const';
import { render, RenderPosition, replace } from '../utils/render';
import { EventComponent } from '../view/event';
import { EditEventComponent } from '../view/event-edit';


export  default class PointController {
  constructor(tripEventListContainer) {
    this._tripEventListContainer = tripEventListContainer;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleFormCloseHandler = this._handleFormCloseHandler.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
  }

  /*	Добавим возможность повторно инициализировать презентер задачи.
		Для этого в методе init будем запоминать предыдущие компоненты.
		Если они null, то есть не создавались, рендерим как раньше.
		Если они отличны от null, то есть создавались, то заменяем их новыми и удаляем
		*/
  init(event) {
    this._point = event;

    this._eventComponent = new EventComponent(event);
    this._editEventComponent = new EditEventComponent(event);


	 this._eventComponent.setClickHandler(this._handleEditClick);
	 this._editEventComponent.setClickHandler(this._handleFormCloseHandler);
   this._editEventComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._tripEventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._tripEventListContainer, this._editEventComponent, this._eventComponent);
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._tripEventListContainer, this._eventComponent, this._editEventComponent);
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  }

  _onEscKeyDownHandler(evt) {
    const isEsc = evt.code === ESC_CODE;

    if(isEsc) {
      this._replaceFormToCard();
    }
  }
  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

	_handleFormCloseHandler() {
		this._replaceFormToCard();
	}

}
