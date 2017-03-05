import { Router } from 'express';
import { vehicle } from '../models/vehicles';

export default () => {
  const router = Router();

	router.all('/:modelYear?/:manufacturer?/:model?', (req, res) => {

		let modelYear = req.params.modelYear || req.body.modelYear;
		let manufacturer = req.params.manufacturer || req.body.manufacturer;
		let model = req.params.model || req.body.model;

		let withRating = (req.query.withRating === 'true');

		vehicle(modelYear, manufacturer, model, withRating).then((response) => {
			res.json(response);
		})
		.catch((e) => {
			console.error(e)
			res.status(500).send(e.error)
		});

	});

	return router;
}
