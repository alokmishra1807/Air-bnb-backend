import express from "express";
const app = express();
import { serverConfig } from "./config";
import { genericErrorHandler } from "./middleware/error.middleware";
import gatewayRoutes from "./router/v1/gateway.routes";

import { attachCorrelationMiddleware } from "./middleware/correlation.middleware";


// app.use(express.json());

app.use(attachCorrelationMiddleware);

app.use("/api/v1", gatewayRoutes);

app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  console.log(`Listening to PORT ${serverConfig.PORT}`);
  // logger.info(`press ctrl + C to stop the server`)
});
