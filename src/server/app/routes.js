import express from 'express';
import { getHandler, postHandler } from '../handlers';

export const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Router used on time: ', Date.now());
	next();
});

export const validateRequest = (req, res, next) => {
	const { body } = req;

	if (body && body.salePrice && body.address) {
		return next();
	}

	throw { status: 400, message: 'needs salePrice and address' };
};

// define the home page route
router.post('/', validateRequest, postHandler);
// define the about route
router.get('/', getHandler);

export default router;
