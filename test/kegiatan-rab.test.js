const HTTPStatus = require("http-status");
const { DOSEN1_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/:id_kegiatan/rab", () => {
  test("It'd 200 OK and return rab ", async () => {
    const { statusCode, body: rab } = await agent
      .get("/kegiatan/1/rab")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(rab[0]).toMatchObject({ nama_jenis_belanja: "Belanja Barang", nama_item: "Printer #1" });
    expect(rab[1]).toMatchObject({ nama_item: "Gaji Mahasiswa" });
  });
});

describe("Route POST /kegiatan/:id_kegiatan/rab", () => {
  test("It should response 200 OK and return kegiatan rab when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newRab = {
      id_jenis_belanja: "02",
      tahun_ke: 1,
      nama_item: "Inserted RAB",
      satuan: "Box",
      vol: 30,
      biaya_satuan: 99999,
    };
    const { statusCode, body: rab } = await agent
      .post("/kegiatan/10/rab")
      .send(newRab)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(rab).toMatchObject(newRab);
    await periodeTable.reset();
  });
});

describe("Route PATCH /kegiatan/:id_kegiatan/rab", () => {
  test("It should response 200 OK and return kegiatan rab when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newRab = {
      nama_item: "Updated",
    };
    const { statusCode, body: rab } = await agent
      .patch("/kegiatan/10/rab/5")
      .send(newRab)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(rab).toMatchObject(newRab);
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/rab/:id_kegiatan_rab", () => {
  test("It should response 200 OK and return kegiatan rab when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/rab/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
