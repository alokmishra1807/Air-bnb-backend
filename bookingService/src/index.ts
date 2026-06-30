import express from 'express';
const app = express();
import {serverConfig} from './config'
import v1Router from './router/v1/index.router';
import v2Router from './router/v2/index.router'
import { genericErrorHandler } from './middleware/error.middleware';
// import logger from "./config/logger.config"
import { attachCorrelationMiddleware } from './middleware/correlation.middleware';
import sequelize from './db/models/sequelize'
import logger from './config/logger.config';
// import { addEmailToQueue } from './producers/email.producer';


app.use(express.json());

app.use(attachCorrelationMiddleware);
app.use('/api/v1',v1Router);
app.use('/api/v2',v2Router);


app.use(genericErrorHandler);



app.listen(serverConfig.PORT,async()=>{
    console.log(`Listening to PORT ${serverConfig.PORT}`);
    // logger.info(`press ctrl + C to stop the server`)
     try {

    await sequelize.authenticate();
    logger.info("Conntected to db successfully");
    
   } catch (error) {
    logger.error("Something went wrong");
   }

    // addEmailToQueue({
    //         to: "shreyas199915@gmail.com",
    //         subject: "Sample Email booking",
    //         templateId: "welcome",
    //         params: {
    //             name: "John Doe",
    //             orderId: "12345",
    //         }
    //     })

})