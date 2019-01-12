import "reflect-metadata";

import express from "express";
import passportConfig from "./config/passport";

import cors from "cors";
import parser from "body-parser";
import compression from "compression";

import {
  useExpressServer,
  useContainer as routingUseContainer
} from "routing-controllers";
import { GymController } from "./gym/gymController";
import { UserController } from "./user/userController";
import { Container } from "typedi";
import mongoose from "mongoose";

let app = express();

routingUseContainer(Container);

mongoose
  .connect(
    "mongodb://testas:testas123@ds135952.mlab.com:35952/gymr-dev",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb connected..."))
  .catch(err => console.log(err));

passportConfig(app);

app.use(cors({ credentials: true, origin: true }));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(compression());

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [GymController, UserController] // we specify controllers we want to use
});

app.listen(5000);
