const HTTPStatus = require("http-status");
const { DOSEN1_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/:id_kegiatan/anggota", () => {
  test("It'd 200 OK and return anggota ", async () => {
    const { statusCode, body: anggota } = await agent
      .get("/kegiatan/1/anggota")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(anggota[0]).toMatchObject({ id_user: 1, posisi: "KETUA" });
    expect(anggota[1]).toMatchObject({ id_user: 2, posisi: "ANGGOTA" });
  });
});

describe("Route POST /kegiatan/:id_kegiatan/anggota", () => {
  test("It should response 200 OK and return kegiatan anggota when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newAnggota = { id_user: 4 };
    const { statusCode, body: anggota } = await agent
      .post("/kegiatan/10/anggota")
      .send(newAnggota)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(anggota).toMatchObject({
      ...newAnggota,
      username: "dosen4",
      nama_user: "Dosen #4",
    });
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota", () => {
  test("It should response 200 OK and return kegiatan anggota when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/anggota/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
