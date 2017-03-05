import { Router } from 'express';
import { colorConsole as logger } from 'tracer';
import { vehicle } from '../models/vehicles';

export default () => {
  const router = Router();

  router.all('/:modelYear?/:manufacturer?/:model?', (req, res) => {
    const modelYear = req.params.modelYear || req.body.modelYear;
    const manufacturer = req.params.manufacturer || req.body.manufacturer;
    const model = req.params.model || req.body.model;
    const withRating = (req.query.withRating === 'true');

    vehicle(modelYear, manufacturer, model, withRating).then((response) => {
      logger.info('Sending Response');
      logger.info(response);
      res.json(response);
    }).catch((e) => {
      logger.error(e);
      res.status(500).send(e.error);
    });
  });
  return router;
};
