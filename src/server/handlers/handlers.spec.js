import { getHandler, postHandler } from './property.handler';
import * as Helpers from './helpers';
import Houses, { INITIAL_DATA } from '../in-memory-db';

describe('request handlers', () => {
	const mockRes = { send: jest.fn() };
	Helpers.addAverageFlag = jest.fn(() => 'addAverageFlagResult');

	beforeEach(() => Houses.init(INITIAL_DATA));

	describe('getHandler', () => {
		beforeEach(() => jest.clearAllMocks());
		const mockGetReq = { query: { suburb: 'Point Cook' } };

		it('calls the addAverageFlag with the results from DB', () => {
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

		it('calls the res with the response from addAverageFlag', () => {
			getHandler(mockGetReq, mockRes);
			expect(mockRes.send).toHaveBeenCalledWith('addAverageFlagResult');
		});
	});

	describe('postHandler', () => {
		beforeEach(() => jest.clearAllMocks());

		it('creates a new record in DB for valid data', () => {
			const mockPostRequest = {
				body: { suburb: 'Point Cook', description: ' new house' },
			};
			postHandler(mockPostRequest, mockRes);
			expect(Houses.findAllBySuburb('Point Cook').length).toBe(2);
		});

		it('throws error if suburb is empty', () => {
			const mockPostRequest = {
				body: { suburb: '', description: ' new house' },
			};
			let error = null;
			try {
				postHandler(mockPostRequest, mockRes);
			} catch (err) {
				error = err;
			}
			expect(Houses.findAllBySuburb('Point Cook').length).toBe(1);
			expect(error).toEqual({
				code: 501,
				message: 'cannot insert house without suburb',
			});
		});
	});
});
