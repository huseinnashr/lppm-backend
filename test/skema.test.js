const HTTPStatus = require("http-status");
const { DOSEN1_CRED, SKEMA01_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /program/:id_program/skema", () => {
  test_not_auth_unauthorized(agent, "GET", "/program/01/skema");

  test("It should response 200 OK and return skema", async () => {
    const { statusCode, body: skema } = await agent
      .get("/program/01/skema")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(skema.length).toEqual(SKEMA01_LENGTH);
    expect(skema[1]).toMatchObject({
      id_skema: "0102",
      elligible: true,
      message: [],
    });
    expect(skema[2]).toMatchObject({
      id_skema: "0103",
      id_program: "01",
      nama_skema: "Unggulan Profesi",
      dana_maksimum: 250000000,
      lama_maksimum: 4,
      tkt_min: 4,
      tkt_max: 6,
      elligible: false,
      message: ["Jabatan fungsional minimal Profesor", "Jenjang pendidikan minimal Strata 3"],
    });
  });
});
