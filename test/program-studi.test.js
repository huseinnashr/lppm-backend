const HTTPStatus = require("http-status");
const { ADMIN_CRED, PROGRAM_STUDI_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /program-studi", () => {
  test_not_auth_unauthorized(agent, "GET", "/program-studi");

  test("It should response 200 OK and return program studi", async () => {
    const { statusCode, body: programStudi } = await agent
      .get("/program-studi")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(programStudi.length).toEqual(PROGRAM_STUDI_LENGTH);
    expect(programStudi[1]).toEqual({
      id_program_studi: 2,
      id_fakultas: 1,
      id_jenjang_pendidikan: 0,
      nama_program_studi: "Kesekretariatan",
      kelompok: "SAINS",
    });
  });
});
