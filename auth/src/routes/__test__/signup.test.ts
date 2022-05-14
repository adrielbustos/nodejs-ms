import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
});

it("return a 400 with an invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "tesdfgmail.com",
            password: "password"
        })
        .expect(400);
});

it("return a 400 with an invalid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "tesdf@gmail.com",
            password: 234
        })
        .expect(400);
});

it("desallows duplicate email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "duplicate@gmail.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "duplicate@gmail.com",
            password: "password"
        })
        .expect(400);
});

it("sets a coockie after successful signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});