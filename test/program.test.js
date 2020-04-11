const HTTPStatus = require("http-status");
const { ADMIN_CRED, PROGRAM_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /program", () => {
  test_not_auth_unauthorized(agent, "GET", "/program");

  test("It should response 200 OK and return program", async () => {
    const { statusCode, body: program } = await agent
      .get("/program")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(program.length).toEqual(PROGRAM_LENGTH);
    expect(program[1]).toEqual({
      id_program: "02",
      nama_program: "Penelitian PNBP Fakultas",
    });
  });
});
