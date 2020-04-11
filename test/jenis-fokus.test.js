const HTTPStatus = require("http-status");
const { ADMIN_CRED, JENIS_FOKUS_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /jenis-fokus", () => {
  test_not_auth_unauthorized(agent, "GET", "/jenis-fokus");

  test("It should response 200 OK and return program studi", async () => {
    const { statusCode, body: jenisFokus } = await agent
      .get("/jenis-fokus")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(jenisFokus.length).toEqual(JENIS_FOKUS_LENGTH);
    expect(jenisFokus[1]).toEqual({
      id_jenis_fokus: "20",
      nama_jenis_fokus: "Energi - Energi Baru dan Tebarukan",
    });
  });
});
