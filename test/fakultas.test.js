const HTTPStatus = require("http-status");
const { ADMIN_CRED, FAKULTAS_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /fakultas", () => {
  test_not_auth_unauthorized(agent, "GET", "/fakultas");

  test("It should response 200 OK and return fakultas", async () => {
    const { statusCode, body: fakultas } = await agent
      .get("/fakultas")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(fakultas.length).toEqual(FAKULTAS_LENGTH);
    expect(fakultas[1]).toEqual({
      id_fakultas: 2,
      nama_fakultas: "Hukum",
      singkatan: "FH",
    });
  });
});
