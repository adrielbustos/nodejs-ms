import express from "express";

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
    res.send("hi there");
});

export {router as signinRouter};