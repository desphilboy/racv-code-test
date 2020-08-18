import request from "supertest";
import { app } from "./app/app";
import Houses, { INITIAL_DATA } from "./in-memory-db";

describe("end to end APIs test", () => {
	beforeEach(() => Houses.init(INITIAL_DATA));
	describe("GET API", () => {
		it("gets the properties from DB", async () => {
			const response = await request(app).get("/properties");
			expect(response.status).toBe(200);
			expect(JSON.parse(response.text)[0]).toEqual({
				address: "31 Terrene Terrace",
				description: "description of the house",
				id: expect.any(String),
				priceFlag: "Within Average Range",
				salePrice: "700000",
				state: "VIC",
				suburb: "Point Cook",
				zip: "3030",
			});
			expect(JSON.parse(response.text)[1]).toEqual({
				address: "89 Penrose Promenade",
				description: "description of the house",
				id: expect.any(String),
				priceFlag: "Within Average Range",
				salePrice: "650000",
				state: "VIC",
				suburb: "Tarneit",
				zip: "3029",
			});
		});

		it("gets filters by suburb", async () => {
			const response = await request(app).get("/properties?suburb=Point Cook");
			expect(response.status).toBe(200);
			expect(JSON.parse(response.text)[0]).toEqual({
				address: "31 Terrene Terrace",
				description: "description of the house",
				id: expect.any(String),
				priceFlag: "Within Average Range",
				salePrice: "700000",
				state: "VIC",
				suburb: "Point Cook",
				zip: "3030",
			});
			expect(JSON.parse(response.text).length).toEqual(1);
		});
	});

	describe("POST API", () => {
		it("creates the property according to body into DB", async () => {
			const data = {
				suburb: "Point Cook",
				salePrice: "660000",
				address: "some address",
				description: "Posted property",
			};
			const response = await request(app)
				.post("/properties")
				.send(data);

			expect(response.status).toBe(200);
			expect(JSON.parse(response.text)).toMatchInlineSnapshot(`
			Object {
			  "message": "Record created successfully",
			  "property": Object {
			    "address": "some address",
			    "description": "Posted property",
			    "salePrice": "660000",
			    "suburb": "Point Cook",
			  },
			}
		`);
			expect(Houses.findAll().length).toBe(3);
		});

		it("does not create the property without suburb", async () => {
			const data = {
				suburb: null,
				salePrice: "660000",
				address: "some address",
				description: "Posted property",
			};

			const response = await request(app)
				.post("/properties")
				.send(data);

			expect(response.status).toBe(500);
			expect(Houses.findAll().length).toBe(2);
		});

		it("does not create the property without address", async () => {
			const data = {
				suburb: null,
				salePrice: "660000",
				description: "Posted property",
			};

			const response = await request(app)
				.post("/properties")
				.send(data);

			expect(response.status).toBe(400);
			expect(Houses.findAll().length).toBe(2);
		});

		it("does not create the property without price", async () => {
			const data = {
				suburb: null,
				address: "some address",
				description: "Posted property",
			};

			const response = await request(app)
				.post("/properties")
				.send(data);

			expect(response.status).toBe(400);
			expect(Houses.findAll().length).toBe(2);
		});
	});
});
