import express from 'express';
import pingRouter from './ping_router';
import userRouter from './user.router';
import roleRouter from './roles.router';

const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use('/user',userRouter);
v1Router.use('/roles',roleRouter);

export default v1Router;