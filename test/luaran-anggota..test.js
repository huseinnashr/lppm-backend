const HTTPStatus = require("http-status");
const { DOSEN1_CRED, DOSEN2_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /luaran/:id_luaran/anggota", () => {
  test("It'd 200 OK and return anggota ", async () => {
    const { statusCode, body: anggota } = await agent
      .get("/luaran/1/anggota")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(anggota[0]).toMatchObject({ id_user: 1, posisi: "KETUA" });
    expect(anggota[1]).toMatchObject({ id_user: 2, posisi: "ANGGOTA" });
  });
});

describe("Route POST /luaran/:id_luaran/anggota", () => {
  test("It should response 200 OK and return luaran anggota when dosen", async () => {
    const newAnggota = { id_user: 4 };
    const { statusCode, body: anggota } = await agent
      .post("/luaran/4/anggota")
      .send(newAnggota)
      .set("cookie", await get_auth(agent, DOSEN2_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(anggota).toMatchObject({
      ...newAnggota,
      username: "dosen4",
      nama_user: "Dosen #4",
    });
  });
});

describe("Route DELETE /luaran/:id_luaran/anggota/:id_luaran_anggota", () => {
  test("It should response 200 OK and return luaran anggota when dosen", async () => {
    const { statusCode } = await agent
      .delete("/luaran/4/anggota/7")
      .set("cookie", await get_auth(agent, DOSEN2_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});
