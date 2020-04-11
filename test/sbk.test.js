const HTTPStatus = require("http-status");
const { ADMIN_CRED, SBK_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /sbk", () => {
  test_not_auth_unauthorized(agent, "GET", "/sbk");

  test("It should response 200 OK and return sbk", async () => {
    const { statusCode, body: sbk } = await agent
      .get("/sbk")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(sbk.length).toEqual(SBK_LENGTH);
    expect(sbk[1]).toEqual({
      id_sbk: 2,
      nama_sbk: "SBK Riset Terapan",
      tkt_min: 4,
      tkt_max: 6,
    });
  });
});
