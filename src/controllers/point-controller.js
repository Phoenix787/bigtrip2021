import { ESC_CODE, UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition, replace } from '../utils/render';
import AbstractView from '../view/abstract-view';
import { EventComponent } from '../view/event';
import { EditEventComponent } from '../view/event-edit';

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export  default class PointController {
  constructor(tripEventListContainer, changeData, changeMode) {
    this._tripEventListContainer = tripEventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._currentMode = Mode.DEFAULT;

    this._eventComponent = null;
    this._editEventComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormCloseHandler = this._handleFormCloseHandler.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
    //this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  /*	Добавим возможность повторно инициализировать презентер задачи.
		Для этого в методе init будем запоминать предыдущие компоненты.
		Если они null, то есть не создавались, рендерим как раньше.
		Если они отличны от null, то есть создавались, то заменяем их новыми и удаляем
		*/
  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditEventComponent = this._editEventComponent;

    this._eventComponent = new EventComponent(event);
    this._editEventComponent = new EditEventComponent(event);

    this._eventComponent.setClickHandler(this._handleEditClick);
    this._editEventComponent.setClickHandler(this._handleFormCloseHandler);
    this._editEventComponent.setFormSubmitHandler(this._handleFormSubmit);
    //this._editEventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if(prevEventComponent === null || prevEditEventComponent === null) {
      render(this._tripEventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }
    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if(this._tripEventListContainer instanceof AbstractView) {
      this._tripEventListContainer = this._tripEventListContainer.getElement();
    }

    //if(this._tripEventListContainer.contains(prevEventComponent.getElement())) {
    if(this._currentMode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }
    //if(this._tripEventListContainer.contains(prevEditEventComponent.getElement())) {
    if(this._currentMode === Mode.EDIT) {
      replace(this._editEventComponent, prevEditEventComponent);
    }
    remove(prevEventComponent);
    remove(prevEditEventComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editEventComponent);
  }

  resetView() {
    if(this._currentMode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._editEventComponent, this._eventComponent);
    document.addEventListener('keydown', this._onEscKeyDownHandler);
    this._changeMode();
    this._currentMode = Mode.EDIT;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._editEventComponent);
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
    this._currentMode = Mode.DEFAULT;
  }

  _onEscKeyDownHandler(evt) {
    const isEsc = evt.code === ESC_CODE;

    if(isEsc) {
			this._editEventComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(UserAction.UPDATE_EVENT, UpdateType.PATCH, event);
    this._replaceFormToCard();
  }

  _handleFormCloseHandler() {
    this._replaceFormToCard();
  }


}
