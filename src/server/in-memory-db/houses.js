import uuid4 from "uuid4";
import cloneDeep from "lodash.clonedeep";

export let PARTS = {};

const insert = (house) => {
	if (!house.suburb) {
		throw { code: 501, message: "cannot insert house without suburb" };
	}

	if (!PARTS[house.suburb]) {
		PARTS[house.suburb] = [cloneDeep({ ...house, id: uuid4() })];
	} else {
		PARTS[house.suburb].push(cloneDeep({ ...house, id: uuid4() }));
	}
};

const init = (data) => {
	PARTS = {};
	(data || []).forEach((d) => insert(d));
};

const findAll = () =>
	Object.values(PARTS).reduce((acc, part) => [...acc, ...part], []);

const findAllBySuburb = (suburb) => (!suburb ? findAll() : PARTS[suburb] || []);

export const HousesDB = {
	insert,
	init,
	findAll,
	findAllBySuburb,
};

export default HousesDB;
