const HTTPStatus = require("http-status");
const { ADMIN_CRED, JENIS_BELANJA_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /jenis-belanja", () => {
  test_not_auth_unauthorized(agent, "GET", "/jenis-belanja");

  test("It should response 200 OK and return jenis belanja", async () => {
    const { statusCode, body: jenisBelanja } = await agent
      .get("/jenis-belanja")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(jenisBelanja.length).toEqual(JENIS_BELANJA_LENGTH);
    expect(jenisBelanja[1]).toEqual({
      id_jenis_belanja: "02",
      nama_jenis_belanja: "Belanja Non Operasional Lainnya",
    });
  });
});
