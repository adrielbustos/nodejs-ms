import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
    process.env.jwtSecret = "abc123"
    mongo = await MongoMemoryServer.create();
    const mongoUrl = mongo.getUri();
    await mongoose.connect(mongoUrl);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async () => {
    const email = "test@test.com";
    const password = "password";
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email, password
        })
        .expect(201);
    const cookie = response.get("Set-Cookie");
    return cookie;
}