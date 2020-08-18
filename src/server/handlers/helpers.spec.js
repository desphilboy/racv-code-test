import { POIN_COOK_HOUSES, TARNEIT_HOUSES } from '../in-memory-db/initial-data';
import { calculateAveragePrice, addAverageFlag } from './helpers';

describe('Handlers helpers', () => {
	describe('Calculate Avarage Price', () => {
		it('calculates the average for the given array', () => {
			expect(calculateAveragePrice(POIN_COOK_HOUSES)).toBe(700000);
			expect(calculateAveragePrice(TARNEIT_HOUSES)).toBe(650000);
			expect(
				calculateAveragePrice([...TARNEIT_HOUSES, ...POIN_COOK_HOUSES]),
			).toBe(675000);
		});

		it('properties without price will not affect the average', () => {
			expect(
				calculateAveragePrice([
					...TARNEIT_HOUSES,
					...POIN_COOK_HOUSES,
					NO_PRICE_HOUSE,
				]),
			).toBe(675000);
		});
	});

	describe('Add price flag', () => {
		it('for expensive house it says Higher than range', () => {
			const houses = addAverageFlag([
				...TARNEIT_HOUSES,
				...POIN_COOK_HOUSES,
				...TARNEIT_HOUSES,
				HI_PRICE_HOUSE,
			]);
			expect(houses[3].priceFlag).toBe('Higher than Average Range');
		});

		it('for cheap house it says Lower than range', () => {
			const houses = addAverageFlag([
				...TARNEIT_HOUSES,
				...POIN_COOK_HOUSES,
				...TARNEIT_HOUSES,
				LOW_PRICE_HOUSE,
			]);
			expect(houses[3].priceFlag).toBe('Lower than Average Range');
		});

		it('for average houses within range', () => {
			const houses = addAverageFlag([
				HI_PRICE_HOUSE,
				...TARNEIT_HOUSES,
				...POIN_COOK_HOUSES,
				...TARNEIT_HOUSES,
				LOW_PRICE_HOUSE,
			]);
			expect(houses[3].priceFlag).toBe('Within Average Range');
			expect(houses[2].priceFlag).toBe('Within Average Range');
		});

		it('for no price houses says unknown', () => {
			const houses = addAverageFlag([
				HI_PRICE_HOUSE,
				...TARNEIT_HOUSES,
				...POIN_COOK_HOUSES,
				...TARNEIT_HOUSES,
				LOW_PRICE_HOUSE,
				NO_PRICE_HOUSE,
			]);
			expect(houses[5].priceFlag).toBe('Unknown');
		});
	});
});

const NO_PRICE_HOUSE = {
	state: 'VIC',
	zip: '3030',
	suburb: 'Point Cook',
	description: 'Call property agent for price info +614567891011 John Smith',
	address: '33 Terrene Terrace',
};

const HI_PRICE_HOUSE = {
	state: 'VIC',
	zip: '3030',
	suburb: 'Point Cook',
	description: 'Very fancy',
	address: '44 Terrene Terrace',
	salePrice: '780000',
};

const LOW_PRICE_HOUSE = {
	state: 'VIC',
	zip: '3030',
	suburb: 'Point Cook',
	description: 'Very cheap',
	address: '31 Terrene Terrace',
	salePrice: '590000',
};
