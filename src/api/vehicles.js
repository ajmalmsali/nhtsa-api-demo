import { version } from '../../package.json';
import { Router } from 'express';
import { vehicle } from '../models/vehicles';

export default ({ config }) => {
	let router = Router();

	router.all('/:modelYear?/:manufacturer?/:model?', (req, res) => {

		let modelYear = req.params.modelYear || req.body.modelYear;
		let manufacturer = req.params.manufacturer || req.body.manufacturer;
		let model = req.params.model || req.body.model;

		let withRating = (req.query.withRating === 'true');

		console.log(req.params)

		vehicle(modelYear, manufacturer, model, withRating).then((response) => {
			res.send(response);
		})
		.catch((e) => {
			console.log(e)
			res.status(500).send(e.error)
		})

	});

	return router;
}
