import express from 'express';
import { pingHandler } from '../../controllers/ping.controllers';
// import { validateRequestBody } from '../../validators';
// import { pingSchema } from '../../validators/ping.validator';

const pingRouter = express.Router();

pingRouter.get('/', pingHandler);

export default pingRouter;