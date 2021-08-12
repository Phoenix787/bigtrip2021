export const Action = {
  TO: 'to',
  IN: 'in',
};

export const Group = {
  TRANSFER: 'Transfer',
  ACTIVITY: 'Activity',
};

export const EventTypes = [
  {name: 'taxi', iconURL: 'img/icons/taxi.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'bus', iconURL: 'img/icons/bus.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'train', iconURL: 'img/icons/train.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'ship', iconURL: 'img/icons/ship.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'drive', iconURL: 'img/icons/drive.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'transport', iconURL: 'img/icons/transport.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'flight', iconURL: 'img/icons/flight.png', group: Group.TRANSFER, action: Action.TO},
  {name: 'check-in', iconURL: 'img/icons/check-in.png', group: Group.ACTIVITY, action: Action.IN},
  {name: 'sightseeing', iconURL: 'img/icons/sightseeing.png', group: Group.ACTIVITY, action: Action.IN},
  {name: 'restaurant', iconURL: 'img/icons/restaurant.png', group: Group.ACTIVITY, action: Action.IN},
];

export const eventOffers = [
  {name: 'luggage', description: 'Add luggage', price: 30},
  {name: 'comfort', description: 'Switch to comfort class', price: 100},
  {name: 'meal', description: 'Add meal', price: 15},
  {name: 'seats', description: 'Choose seats', price: 5},
  {name: 'train', description: 'Travel by train', price: 40},
];


export const isOffering = (offers) => {
  return offers.some((item) => item.checked === true);
};

export const findEventType = (eventTypeName) => {

  const index = EventTypes.findIndex((it) => it.name === eventTypeName);

  if(index === -1) {
    return EventTypes[0];
  }

  return EventTypes[index];
};

export const updateEventPrice = (offers)  => {
	return offers
						.slice()
						.filter((it) => {return it.checked === true; })
						.reduce((acc, it) => acc + it.price, 0);
}