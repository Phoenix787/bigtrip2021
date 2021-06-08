import { tripInfoTemplate } from './trip';
import { tripInfoCostTemplate } from './trip-cost';
export const createTripAndCostComponent = () => {

  return (
    `<section class="trip-main__trip-info  trip-info">
			${tripInfoTemplate()}

			${tripInfoCostTemplate(1450)}
		</section>`
  );
};
