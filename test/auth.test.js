const { ADMIN_CRED, DOSEN1_CRED, UNKNOWN_CRED, WRONG_CRED } = require("./consts");
const agent = require("supertest")(require("../app"));

describe("Route POST /login", () => {
  test("It should response 200 and return user on admin credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(ADMIN_CRED);
    expect(statusCode).toBe(200);
    expect(user.username).toBe("admin");
  });
  test("It should response 200 and return user on dosen credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(DOSEN1_CRED);
    expect(statusCode).toBe(200);
    expect(user.username).toBe("dosen1");
  });
  test("It should response 401 and return error on unknown credential", async () => {
    const { statusCode, body } = await agent.post("/login").send(UNKNOWN_CRED);
    expect(statusCode).toBe(401);
    expect(body.error).toBe("User tidak ditemukan");
  });
  test("It should response 401 and return error on wrong password", async () => {
    const { statusCode, body } = await agent.post("/login").send(WRONG_CRED);
    expect(statusCode).toBe(401);
    expect(body.error).toBe("Password salah");
  });
});

describe("Route POST /logout", () => {
  test("It should response 200", async () => {
    const { statusCode } = await agent.post("/logout");
    expect(statusCode).toBe(200);
  });
});
