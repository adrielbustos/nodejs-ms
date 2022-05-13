import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
// npm install typescript ts-node-dev express
// tsc --init

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongose.connect("mongodb://mongo:ZvprduQDWz69oHIRXeOI@containers-us-west-57.railway.app:6779");
    // await mongose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();