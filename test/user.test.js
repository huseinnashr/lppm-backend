const { ADMIN_CRED, DOSEN1_CRED } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /user", () => {
  test_not_auth_unauthorized(agent, "GET", "/user");
  test_auth_forbidden(agent, "GET", "/user", DOSEN1_CRED);

  test("It should response 200 and return user when admin", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const { statusCode, body: users } = await agent
      .get("/user")
      .set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(200);
    expect(Array.isArray(users) && (users.length == 0 || users[0]["id_user"])).toBeTruthy();
  });
});
