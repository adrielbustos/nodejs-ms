import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", async (req, res) => {
    if (!req.session || !req.session.jwt) {
        return res.send({currentUser: null});
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.jwtSecret!);
        return res.send({currentUser: payload});
    } catch (error) {
        return res.send({currentUser: null});
    }
});

export {router as currentUserRouter};