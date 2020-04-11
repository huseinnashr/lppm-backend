const HTTPStatus = require("http-status");
const { ADMIN_CRED, JENIS_TOPIK_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /jenis-topik", () => {
  test_not_auth_unauthorized(agent, "GET", "/jenis-topik");

  test("It should response 200 OK and return jenis topik", async () => {
    const { statusCode, body: jenisTopik } = await agent
      .get("/jenis-topik")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(jenisTopik.length).toEqual(JENIS_TOPIK_LENGTH);
    expect(jenisTopik[1]).toEqual({
      id_jenis_topik: "101020",
      id_jenis_tema: "1010",
      nama_jenis_topik: "Pemuliaan tanaman dengan teknologi berbasis bioteknologi",
    });
  });
});
