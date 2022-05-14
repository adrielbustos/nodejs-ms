import request from "supertest";
import { app } from "../../app";

it("clears the cookie after siging out", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
    // const response = await request(app)
    //     .get("/api/users/signout")
    //     .send({})
    //     .expect(200);
    // expect(response.get("Set-Cookie")).not.toBeDefined();
    // expect(response.get("Set-Cookie")[0]).toEqual();
});