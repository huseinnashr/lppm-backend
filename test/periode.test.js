const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED, TAHAP_LENGTH } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden, get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET program/:id_program/tahun/:tahun/periode", () => {
  test("It should response 200 OK and return periodes when admin", async () => {
    const { statusCode, body: periodes } = await agent
      .get("/program/01/tahun/2020/periode")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(periodes.length).toEqual(TAHAP_LENGTH);
    expect(periodes[1]).toEqual({
      id_program: "01",
      tahun: 2020,
      id_tahap: 2,
      nama_tahap: "Review Pimpinan",
      mulai: new Date("2020-06-01 00:00").toISOString(),
      berakhir: new Date("2020-06-02 00:00").toISOString(),
    });
  });
});

describe("Route PUT /program/:id_program/tahun/:tahun/periode", () => {
  test_not_auth_unauthorized(agent, "PUT", "/program/01/tahun/2020/periode");
  test_auth_forbidden(agent, "PUT", "/program/01/tahun/2020/periode", DOSEN1_CRED);

  test("It should response 200 OK and return user when admin", async () => {
    const payload = {
      id_tahap: 3,
      mulai: "2020-07-05 00:00",
      berakhir: "2020-07-06 00:00",
    };
    const { statusCode, body: periode } = await agent
      .put("/program/01/tahun/2020/periode")
      .send(payload)
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(periode).toMatchObject({
      id_tahap: payload.id_tahap,
      mulai: new Date(payload.mulai).toISOString(),
      berakhir: new Date(payload.berakhir).toISOString(),
    });
  });
});
