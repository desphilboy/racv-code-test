import Houses from '../in-memory-db';
import { addAverageFlag } from './helpers';

export const getHandler = (req, res) => {
	const { query } = req;
	const { suburb } = query;

	console.log('getHandler params>>>', query);
	const properties = Houses.findAllBySuburb(suburb);
	const propertiesWithFlag = addAverageFlag(properties);
	res.send(propertiesWithFlag);
};
export const postHandler = (req, res) => {
	const { body } = req;

	console.log('getHandler params>>>', body);
	Houses.insert(body);

	res.send({ message: 'Record created successfully', property: body });
};
