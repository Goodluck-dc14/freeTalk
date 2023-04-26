import request from "supertest";
import { app } from "../../../app";

it("returns 201 on successful signup", async () => {
  jest.setTimeout(6000);
  return request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);
});

it("sets the cookie after successful signup", async () => {
  const res = await request(app)
    .post("/signup")
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
