const HTTPStatus = require("http-status");
const { ADMIN_CRED, ROLE_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /role", () => {
  test_not_auth_unauthorized(agent, "GET", "/role");

  test("It should response 200 OK and return roles", async () => {
    const { statusCode, body: roles } = await agent
      .get("/role")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(roles.length).toEqual(ROLE_LENGTH);
    expect(roles[1]).toEqual({
      id_role: 2,
      nama_role: "dosen",
      title_role: "Dosen",
    });
  });
});
