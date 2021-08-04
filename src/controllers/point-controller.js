import { ESC_CODE } from "../const";
import { renderComponent, RenderPosition, replace } from "../utils/render";
import { EventComponent } from "../view/event";
import { EditEventComponent } from "../view/event-edit";


export  default class PointController {
  constructor(tripListContainer) {
    this._tripListContainer = tripListContainer;

		this._eventComponent = null;
		this._editEventComponent = null;

		this._handleEditClick = this._handleEditClick.bind(this);
		this._handleFormSubmit = this._handleFormSabmit.bind(this);
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
		this._editEventComponent.setFormSubmitHandler(this._handleFormSabmit);

		renderComponent(this._tripListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

	_replaceCardToForm() {
    replace(this._tripListContainer, this._editEventComponent, this._eventComponent);
		document.addEventListener('keydown', this._onEscKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._tripListContainer, this._eventComponent, this._editEventComponent);
  }

  _onEscKeyDownHandler(evt) {
    const isEsc = evt.code === ESC_CODE;

    if(isEsc) {
      this._replaceFormToCard();
      document.removeEventListener('keydown', this._onEscKeyDownHandler);
    }
  }


	_handleEditClick() {
		this._replaceCardToForm();
	}

	_handleFormSabmit() {
		this._replaceFormToCard();
	}

}
