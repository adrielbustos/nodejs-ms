require('dotenv').config()
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
// npm install typescript ts-node-dev express
// tsc --init

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.jwtSecret) {
    throw new Error("secret key not found/define");
  }
  try {
    await mongose.connect(process.env.mongoURL ?? "");
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