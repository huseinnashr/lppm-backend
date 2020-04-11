const HTTPStatus = require("http-status");
const { ADMIN_CRED, JENIS_LUARAN_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /jenis-luaran", () => {
  test_not_auth_unauthorized(agent, "GET", "/jenis-luaran");

  test("It should response 200 OK and return jenis luaran", async () => {
    const { statusCode, body: jenisLuaran } = await agent
      .get("/jenis-luaran")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(jenisLuaran.length).toEqual(JENIS_LUARAN_LENGTH);
    expect(jenisLuaran[1]).toEqual({
      id_jenis_luaran: "02",
      nama_jenis_luaran: "Journal",
    });
  });
});
