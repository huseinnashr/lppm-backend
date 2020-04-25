const HTTPStatus = require("http-status");
const { DOSEN1_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/:id_kegiatan/mahasiswa", () => {
  test("It'd 200 OK and return mahasiswa ", async () => {
    const { statusCode, body: mahasiswa } = await agent
      .get("/kegiatan/1/mahasiswa")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(mahasiswa[0]).toMatchObject({ id_mahasiswa: "123123123" });
    expect(mahasiswa[1]).toMatchObject({ id_mahasiswa: "456456456" });
  });
});

describe("Route POST /kegiatan/:id_kegiatan/mahasiswa", () => {
  test("It should response 200 OK and return kegiatan mahasiswa when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newMahasiswa = {
      id_program_studi: 1,
      id_mahasiswa: "2233",
      nama_mahasiswa: "Insert Mahasiswa",
      angkatan: 2020,
    };
    const { statusCode, body: mahasiswa } = await agent
      .post("/kegiatan/10/mahasiswa")
      .send(newMahasiswa)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(mahasiswa).toMatchObject(newMahasiswa);
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/mahasiswa/:id_kegiatan_mahasiswa", () => {
  test("It should response 200 OK and return kegiatan mahasiswa when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/mahasiswa/3")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
