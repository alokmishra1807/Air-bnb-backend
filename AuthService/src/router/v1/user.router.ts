import express from 'express';
import { createUserHandler, getUserByIdHandler, loginUserHandler } from '../../controllers/user.controller';
import { validateRequestBody } from '../../validators';
import { createUserSchema, loginUserSchema } from '../../validators/user';
import { isAuth, requireAnyRoles } from '../../middleware/isAuth';




const userRouter = express.Router();
userRouter.get('/profile',isAuth,requireAnyRoles("user","admin"),getUserByIdHandler);
userRouter.post('/login',validateRequestBody(loginUserSchema),loginUserHandler);
userRouter.post('/signup',validateRequestBody(createUserSchema), createUserHandler);

export default userRouter;