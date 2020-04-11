const HTTPStatus = require("http-status");
const { ADMIN_CRED, SUB_JENIS_LUARAN_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /sub-jenis-luaran", () => {
  test_not_auth_unauthorized(agent, "GET", "/sub-jenis-luaran");

  test("It should response 200 OK and return sub jenis luaran", async () => {
    const { statusCode, body: subJenisLuaran } = await agent
      .get("/sub-jenis-luaran")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(subJenisLuaran.length).toEqual(SUB_JENIS_LUARAN_LENGTH);
    expect(subJenisLuaran[1]).toEqual({
      id_sub_jenis_luaran: "0102",
      id_jenis_luaran: "01",
      nama_sub_jenis_luaran: "Proceeding Nasional",
    });
  });
});
