import { validateRequest } from './routes';

describe('validate Reques', () => {
	beforeEach(() => jest.clearAllMocks());

	it('cals next if there is address and salePrice', () => {
		const req = { body: { salePrice: 5000, address: 'someAddress' } };
		const next = jest.fn();

		validateRequest(req, null, next);
		expect(next).toHaveBeenCalled();
	});

	it('throws error if no salePrice', () => {
		const req = { body: { address: 'someAddress' } };
		const next = jest.fn();

		let error = null;
		try {
			validateRequest(req, null, next);
		} catch (err) {
			error = err;
		}
		expect(error).toMatchInlineSnapshot(`
		Object {
		  "message": "needs salePrice and address",
		  "status": 400,
		}
	`);
		expect(next).not.toHaveBeenCalled();
	});

	it('throws error if no salePrice', () => {
		const req = { body: { salePrice: 5000 } };
		const next = jest.fn();

		let error = null;
		try {
			validateRequest(req, null, next);
		} catch (err) {
			error = err;
		}
		expect(error).toMatchInlineSnapshot(`
		Object {
		  "message": "needs salePrice and address",
		  "status": 400,
		}
	`);
		expect(next).not.toHaveBeenCalled();
	});
});
