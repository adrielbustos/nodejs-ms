import request from "supertest";
import { app } from "../../app";

it("fails whrn a email that does not exists is supplied", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "adriel@gmail.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "adriel@gmail.com",
            password: "password1"
        })
        .expect(400);
});

it("response eith a cookie when given a valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "adriel@gmail.com",
            password: "password"
        })
        .expect(201);
    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "adriel@gmail.com",
            password: "password"
        })
        .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
});