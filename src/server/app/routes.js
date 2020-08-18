import express from 'express';
import { getHandler, postHandler } from '../handlers';

export const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Router used on time: ', Date.now());
	next();
});

// define the home page route
router.post('/', postHandler);
// define the about route
router.get('/', getHandler);

export default router;
