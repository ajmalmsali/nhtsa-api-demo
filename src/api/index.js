import { version } from '../../package.json';
import { Router } from 'express';

import vehicles from './vehicles';

export default ({ config }) => {
	let router = Router();

	// mount the facets resource
	router.use('/vehicles', vehicles({ config }));

	router.get('/', (req, res) => {
		//print app version
		res.json({ version });
	});

	return router;
}
