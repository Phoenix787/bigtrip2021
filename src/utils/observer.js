
export default class Observer {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    this._observers = this._observers.filter((existedObserver) => !(existedObserver === observer));
  }

  notify(updateType, payload) {
    this._observers.forEach((observer) => observer(updateType, payload));
  }
}
