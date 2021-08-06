
export const isOffering = (offers) => {
	return offers.some((item) => item.checked === true);
}