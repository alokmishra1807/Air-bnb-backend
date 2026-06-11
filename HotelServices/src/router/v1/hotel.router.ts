import express from 'express';
import { createhotelHandler, deletehotelbyHandler, getAllhotelHandler, gethotelHandler, updatehotelHandler } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema, updateHotelSchema } from '../../validators/hotel.validator';




const hotelRouter = express.Router();

hotelRouter.post('/',validateRequestBody(hotelSchema), createhotelHandler);
hotelRouter.get('/all',getAllhotelHandler);
//here /all router should above /:id because once it start checking all the avilable routes from top and Does /all fit the pattern /:id? yes and all is treated as id here and cause error.

hotelRouter.get('/:id',gethotelHandler);
hotelRouter.delete('/delete/:id',deletehotelbyHandler);
hotelRouter.patch('/update/:id',validateRequestBody(updateHotelSchema), updatehotelHandler);



export default hotelRouter;