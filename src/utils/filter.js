import { isPointExpired, isPointInFuture } from './event';

export const filter = {
  everything: (events) => events,
  future: (events) => events.filter((point) => isPointInFuture(point)),
  past: (events) => events.filte((point) => isPointExpired(point)),
};
