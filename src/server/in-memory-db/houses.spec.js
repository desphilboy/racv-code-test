import Houses, { PARTS } from "./houses";
import { POIN_COOK_HOUSES, TARNEIT_HOUSES } from "./initial-data";

describe("In Memory DB", () => {
	describe("Houses Table", () => {
		it("is created without problem", () => {
			expect(Houses).toMatchSnapshot();
		});

		it("can be initialized by empty data", () => {
			Houses.init();
			expect(Houses.findAll()).toEqual([]);
		});

		it("data can be inserted in the table", () => {
			Houses.init();

			Houses.insert(WERRIBEE_HOUSE);

			expect(Houses.findAll()).toEqual([
				{ ...WERRIBEE_HOUSE, id: expect.any(String) },
			]);
		});

		it("insert with empty suburb throws error and is not accomplished", () => {
			Houses.init();

			let error = null;
			try {
				Houses.insert(INVALID_HOUSE);
			} catch (e) {
				error = e;
			}

			expect(error).toEqual({
				code: 501,
				message: "cannot insert house without suburb",
			});

			expect(Houses.findAll()).toEqual([]);
		});

		it("insert with existing suburb adds to that suburb", () => {
			Houses.init(POIN_COOK_HOUSES);

			Houses.insert(NEW_POINTCOOK_HOUSE);

			expect(PARTS["Point Cook"]).toEqual([
				{ ...POIN_COOK_HOUSES[0], id: expect.any(String) },
				{ ...NEW_POINTCOOK_HOUSE, id: expect.any(String) },
			]);
		});

		it("is initialized with initial data", () => {
			Houses.init([...POIN_COOK_HOUSES, ...TARNEIT_HOUSES]);
			expect(Houses.findAll()).toEqual([
				{ ...POIN_COOK_HOUSES[0], id: expect.any(String) },
				{ ...TARNEIT_HOUSES[0], id: expect.any(String) },
			]);
		});

		it("FindAllBySuburb returns houses in a suburb", () => {
			Houses.init([...POIN_COOK_HOUSES, ...TARNEIT_HOUSES]);
			expect(Houses.findAllBySuburb("Point Cook")).toEqual([
				{ ...POIN_COOK_HOUSES[0], id: expect.any(String) },
			]);
			expect(Houses.findAllBySuburb("Mitchem")).toEqual([]);
		});

		it("FindAllBySuburb returns all if suburb is falsy", () => {
			Houses.init([...POIN_COOK_HOUSES, ...TARNEIT_HOUSES]);

			expect(Houses.findAllBySuburb("")).toEqual(Houses.findAll());
		});
	});
});

const WERRIBEE_HOUSE = {
	suburb: "Werribee",
	zip: "3030",
	state: "VIC",
	address: "56 Synot street",
	salePrice: "1800000",
};

const INVALID_HOUSE = {
	zip: "3030",
	state: "VIC",
	address: "56 Synot street",
	salePrice: "1800000",
};

const NEW_POINTCOOK_HOUSE = {
	zip: "3030",
	state: "VIC",
	address: "1 Donaldson Place",
	salePrice: "760000",
	suburb: "Point Cook",
};
