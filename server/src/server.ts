import "reflect-metadata"; // this shim is required


// import http from "http";
// import express from "express";
// import { applyMiddleware, applyRoutes } from "./utils";
// import routes from "./services";
// import middleware from "./middleware";
// import passportConfig from "./config/passport";

import {createExpressServer, useContainer as routingUseContainer } from "routing-controllers";
import {GymController} from "./services/gym/gymController";
import { Container } from 'typedi';


routingUseContainer(Container);

const app = createExpressServer({
    routePrefix: '/api',
    controllers: [GymController] // we specify controllers we want to use
 });
 
 app.listen(5000);

// const router = express();
// passportConfig(router);

// applyMiddleware(middleware, router);
// applyRoutes(routes, router);

// const { PORT = 5000 } = process.env;
// const server = http.createServer(router);

// server.listen(PORT, () =>
//     console.log(`Server is running http://localhost:${PORT}...`)
// );
