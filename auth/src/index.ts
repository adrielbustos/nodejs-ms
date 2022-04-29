import express from "express";
import { json } from "body-parser";

// npm install typescript ts-node-dev
// tsc --init

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
