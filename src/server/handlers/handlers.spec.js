import { getHandler, postHandler } from './property.handler';
import * as Helpers from './helpers';
import Houses, { INITIAL_DATA } from '../in-memory-db';

describe('request handlers', () => {
	const mockGetReq = { query: { suburb: 'Point Cook' } };
	const mockRes = { send: jest.fn() };
	Helpers.addAverageFlag = jest.fn(() => 'addAverageFlagResult');
	Houses.init(INITIAL_DATA);

	describe('getHandler', () => {
		beforeEach(() => jest.clearAllMocks());

		it('calls the addAverageFlag', () => {
			getHandler(mockGetReq, mockRes);
			expect(Helpers.addAverageFlag).toHaveBeenCalledWith([
				{
					address: '31 Terrene Terrace',
					description: 'description of the house',
					id: expect.any(String),
					salePrice: '700000',
					state: 'VIC',
					suburb: 'Point Cook',
					zip: '3030',
				},
			]);
		});
	});
});
