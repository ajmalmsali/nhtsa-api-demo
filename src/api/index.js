import { Router } from 'express';
import { colorConsole as logger } from 'tracer';
import { version } from '../../package.json';
import vehicles from './vehicles';

export default ({ config }) => {
  const router = Router();

  // mount the facets resource
  router.use('/vehicles', vehicles({ config }));

  router.get('/', (req, res) => {
    // print app version
    logger.info('checking version!');
    res.json({ version });
  });

  return router;
};
