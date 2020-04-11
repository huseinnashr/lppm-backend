const HTTPStatus = require("http-status");
const { ADMIN_CRED, TKT_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /tkt", () => {
  test_not_auth_unauthorized(agent, "GET", "/tkt");

  test("It should response 200 OK and return tkt", async () => {
    const { statusCode, body: tkt } = await agent
      .get("/tkt")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(tkt.length).toEqual(TKT_LENGTH);
    expect(tkt[1]).toEqual({
      id_tkt: 2,
      nama_tkt: "Formulasi konsep dan/atau aplikasi formulasi",
    });
  });
});
