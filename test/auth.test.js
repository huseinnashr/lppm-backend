const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED, UNKNOWN_CRED, WRONG_CRED } = require("./consts");
const agent = require("supertest")(require("../app"));

describe("Route POST /login", () => {
  test("It should response 200 OK and return user on admin credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(ADMIN_CRED);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user.username).toBe("admin");
  });
  test("It should response 200 OK and return user on dosen credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(DOSEN1_CRED);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ username: "dosen1", id_jabatan_fungsional: 11 });
  });
  test("It should response 401 Unauthorized and return error on unknown credential", async () => {
    const { statusCode, body } = await agent.post("/login").send(UNKNOWN_CRED);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
    expect(body.error).toBe("User tidak ditemukan");
  });
  test("It should response 401 Unauthorized and return error on wrong password", async () => {
    const { statusCode, body } = await agent.post("/login").send(WRONG_CRED);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
    expect(body.error).toBe("Password salah");
  });
});

describe("Route POST /logout", () => {
  test("It should response 200 OK", async () => {
    const { statusCode } = await agent.post("/logout");
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});
