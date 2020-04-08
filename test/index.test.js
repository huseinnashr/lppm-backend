const { ADMIN_CRED } = require("./consts");
const agent = require("supertest")(require("../app"));

describe("Route GET /", () => {
  test("It should response 401 when not authenticated", async () => {
    const { statusCode } = await agent.get("/");
    expect(statusCode).toBe(401);
  });
  test("It should response 200 when authenticated", async () => {
    const { headers } = await agent.post("/login").send(ADMIN_CRED);
    const { statusCode } = await agent.get("/").set("cookie", headers["set-cookie"]);
    expect(statusCode).toBe(200);
  });
});
