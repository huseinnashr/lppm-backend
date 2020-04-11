const HTTPStatus = require("http-status");
const { ADMIN_CRED, JENIS_TEMA_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /jenis-tema", () => {
  test_not_auth_unauthorized(agent, "GET", "/jenis-tema");

  test("It should response 200 OK and return jenis tema", async () => {
    const { statusCode, body: jenisTema } = await agent
      .get("/jenis-tema")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(jenisTema.length).toEqual(JENIS_TEMA_LENGTH);
    expect(jenisTema[1]).toEqual({
      id_jenis_tema: "1020",
      id_jenis_fokus: "10",
      nama_jenis_tema: "Teknologi Budidaya dan Pemanfaatan Lahan Sub-Optimal",
    });
  });
});
