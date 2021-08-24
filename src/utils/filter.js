import { FilterType } from '../const';
import { isPointExpired, isPointInFuture } from './event';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((point) => isPointInFuture(point)),
  [FilterType.PAST]: (events) => events.filte((point) => isPointExpired(point)),
};
