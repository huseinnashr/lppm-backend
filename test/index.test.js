const HTTPStatus = require("http-status");
const { ADMIN_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /", () => {
  test("It should response 401 Unauthorized when not authenticated", async () => {
    const { statusCode } = await agent.get("/");
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
  });
  test("It should response 200 OK when authenticated", async () => {
    const { statusCode } = await agent.get("/").set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});
