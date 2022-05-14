import express, {Request, Response} from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin",[
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .isLength({min: 4, max:20})
        .withMessage("Supply a password")
], 
validateRequest,
async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new BadRequestError("Invalid Credencials");
    }
    if (!await Password.compare(existingUser.password, password)) {
        throw new BadRequestError("Invalid Credencials");
    }
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email 
        }, 
        process.env.jwtSecret!
    );
    req.session = {
        jwt: userJwt
    };
    return res.status(200).send(existingUser);
});

export {router as signinRouter};