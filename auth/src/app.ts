require('dotenv').config()
const cors = require('cors');
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
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
  secure: false
  // secure: process.env.NODE_ENV !== "test"
}));
app.use(cors());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};