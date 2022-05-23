import mongose from "mongoose";
import { app } from "./app";
require('dotenv').config();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("secret key not found/define");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("secret key not found/define");
  }
  try {    
    await mongose.connect(process.env.MONGO_URL ?? "");
    // await mongose.connect(process.env.MONGO_URL);
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
  app.listen(3001, () => {
    console.log("Listening on port 3001!");
  });
};

start();