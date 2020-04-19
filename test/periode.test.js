const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden, get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

afterAll(async () => {
  await periodeTable.reset();
});

describe("Route GET periode", () => {
  test("It should response 200 OK and return periodes when admin", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 2 }, -3);
    const { statusCode, body: periodes } = await agent
      .get("/periode")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    const periode = periodes.find(
      (p) => p.tahun == 2020 && p.id_program == "01" && p.id_tahap == 2
    );
    expect(periode).toMatchObject({
      nama_tahap: "Review Pimpinan",
      status: "BERAKHIR",
    });
  });
});

describe("Route PUT /periode", () => {
  test_not_auth_unauthorized(agent, "PUT", "/periode");
  test_auth_forbidden(agent, "PUT", "/periode", DOSEN1_CRED);

  test("It should response 200 OK and return user when admin", async () => {
    const payload = {
      id_program: "04",
      tahun: 2020,
      id_tahap: 3,
      mulai: "2020-04-01",
      berakhir: "2050-04-01",
    };
    const { statusCode, body: periode } = await agent
      .put("/periode")
      .send(payload)
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(periode).toMatchObject({ ...payload, status: "BERJALAN" });
  });
});
