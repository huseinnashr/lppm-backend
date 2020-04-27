const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED, DOSEN2_CRED, DOSEN4_CRED } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden, get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /luaran", () => {
  test_auth_forbidden(agent, "GET", "/luaran", ADMIN_CRED);

  test("It'd 200 OK and ret luaran arr", async () => {
    const { statusCode, body: luaran } = await agent
      .get("/luaran")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran.length).toBe(3);
    expect(luaran[0]).toMatchObject({
      nama_jenis_luaran: "Journal",
      nama_indexing_institution: "Scopus",
      judul: "The effect of long sleep",
    });
    expect(luaran[0]["anggota"][1]).toMatchObject({ id_user: 2, posisi: "ANGGOTA" });
  });
});

describe("Route GET /luaran/:id_luaran", () => {
  test_not_auth_unauthorized(agent, "GET", "/luaran/2");

  test("It'd 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent
      .get("/luaran/not_exist")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "Luaran tidak ditemukan" });
  });

  test("It'd ret luaran", async () => {
    const { body: luaran } = await agent
      .get("/luaran/2")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(luaran["judul"]).toBe("Portable Bed");
  });
});

describe("Route POST /luaran", () => {
  test_auth_forbidden(agent, "POST", "/luaran", ADMIN_CRED);

  test("It should response 200 OK and return luaran when dosen", async () => {
    const newLuaran = {
      id_sub_jenis_luaran: "0101",
      id_indexing_institution: "01",
      judul: "See the world differently now",
      tahun: 2018,
      penerbit: "ICCS",
      jumlah_halaman: 4,
      isbn: "xfb",
      url: "tre.com",
    };
    const { statusCode, body: luaran } = await agent
      .post("/luaran")
      .send(newLuaran)
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran).toMatchObject(newLuaran);
    expect(luaran["anggota"][0]).toMatchObject({ username: DOSEN4_CRED.username });
  });
});

describe("Route PATCH /luaran/:id_luaran", () => {
  test_auth_forbidden(agent, "PATCH", "/luaran/4", DOSEN1_CRED);

  test("It should response 200 OK and return luaran when dosen", async () => {
    const updatedLuaran = {
      judul: "Edited",
    };
    const { statusCode, body: luaran } = await agent
      .patch("/luaran/4")
      .send(updatedLuaran)
      .set("cookie", await get_auth(agent, DOSEN2_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran).toMatchObject(updatedLuaran);
  });
});

describe("Route DELETE /luaran/:id_luaran", () => {
  test("It should response 200 OK", async () => {
    const { statusCode } = await agent
      .delete("/luaran/5")
      .set("cookie", await get_auth(agent, DOSEN2_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});
