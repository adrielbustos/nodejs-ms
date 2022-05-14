import mongose from "mongoose";
import { app } from "./app";

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
  app.listen(3001, () => {
    console.log("Listening on port 3000!");
  });
};

start();