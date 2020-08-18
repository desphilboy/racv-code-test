export const calculateAveragePrice = propertyArray => {
	const propertiesHavingPrice = propertyArray.filter(
		property => !!property.salePrice,
	);
	const sum = propertiesHavingPrice.reduce(
		(acc, curr) => acc + new Number(curr.salePrice),
		0,
	);
	return sum / propertiesHavingPrice.length;
};

export const addAverageFlag = propertyArray => {
	const average = calculateAveragePrice(propertyArray);
	return propertyArray.map(p => {
		let priceFlag = 'Unknown';

		if (p.salePrice) {
			if (
				p.salePrice < average + 50000 &&
				p.salePrice > average - 50000
			) {
				priceFlag = 'Within Average Range';
			} else {
				priceFlag =
					p.salePrice > average + 50000
						? 'Higher than Average Range'
						: 'Lower than Average Range';
			}
		}
		return { ...p, priceFlag };
	});
};

export default addAverageFlag;
