import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { colorConsole } from 'tracer';
import api from './api';
import config from './config.json';

const app = express();
const logger = colorConsole();

app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors());
app.use(bodyParser.json());

// api router
app.use('/', api({ config })); // mount on root instead of api/version/

app.server.listen(process.env.PORT || config.port, () => {
  logger.info(`Started on port ${app.server.address().port}`);
});

export default app;
