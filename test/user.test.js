const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /user", () => {
  test_not_auth_unauthorized(agent, "GET", "/user");
  test_auth_forbidden(agent, "GET", "/user", DOSEN1_CRED);

  test("It should response 200 OK and return users when admin", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const { statusCode, body: users } = await agent
      .get("/user")
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Array.isArray(users) && (users.length == 0 || users[0]["id_user"])).toBeTruthy();
  });
});

describe("Route POST /user", () => {
  test_not_auth_unauthorized(agent, "POST", "/user");
  test_auth_forbidden(agent, "POST", "/user", DOSEN1_CRED);

  test("It should response 422 UNPROCESSABLE_ENTITY and error when username exist", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const payload = {
      username: "dosen1",
      password: "wasdwasd",
      id_role: 1,
      id_program_studi: 1,
    };
    const { statusCode, body } = await agent
      .post("/user")
      .send(payload)
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(HTTPStatus.UNPROCESSABLE_ENTITY);
    expect(body).toMatchObject({ error: "Username sudah dipakai" });
  });

  test("It should response 200 OK and return user when admin", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const payload = {
      username: "new_user_1",
      password: "wasdwasd",
      id_role: 1,
      id_program_studi: 1,
    };
    const { statusCode, body: user } = await agent
      .post("/user")
      .send(payload)
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toHaveProperty("id_user");
    delete payload.password;
    expect(user).toMatchObject(payload);
  });
});

describe("Route GET /user/:id_user", () => {
  test("It should response 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent.get("/user/not_exist");
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "User tidak ditemukan" });
  });
  test("It should response 200 OK and return user when exist", async () => {
    const { statusCode, body: user } = await agent.get("/user/1");
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ id_user: 1 });
  });
});

describe("Route PATCH /user/:id_user", () => {
  test("It should response 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent.patch("/user/not_exist");
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "User tidak ditemukan" });
  });

  test("It should response 422 UNPROCESSABLE_ENTITY and error when username exist", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const { statusCode, body } = await agent
      .patch("/user/2")
      .send({ username: "dosen2" })
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(HTTPStatus.UNPROCESSABLE_ENTITY);
    expect(body).toMatchObject({ error: "Username sudah dipakai" });
  });

  test("It should response 200 OK and return user on correct payload", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const { statusCode, body } = await agent
      .patch("/user/2")
      .send({ username: "dosen1e" })
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toMatchObject({ id_user: 2, username: "dosen1e" });
  });
});

describe("Route DELETE /user/:id_user", () => {
  test("It should response 200 OK and on correct payload", async () => {
    const { statusCode } = await agent.delete("/user/31");
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});