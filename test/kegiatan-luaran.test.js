const HTTPStatus = require("http-status");
const { DOSEN1_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");
const msg = require("../messages");

describe("Route GET /kegiatan/:id_kegiatan/luaran", () => {
  test("It'd 200 OK and return luaran ", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const { statusCode, body: luaran } = await agent
      .get("/kegiatan/1/luaran")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran[0]).toMatchObject({
      editable: false,
      editable_real: true,
      deskripsi_luaran: "Artikel Ilmiah Pada Jurnal Internasional bereputasi",
    });
    expect(luaran[1]).toMatchObject({ editable: true, deskripsi_luaran: "Deskripsi Luaran #2" });
    await periodeTable.reset();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/luaran", () => {
  test("It should response 200 OK and return kegiatan luaran when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newLuaran = {
      id_jenis_luaran: "03",
      deskripsi_luaran: "Insert Luaran",
    };
    const { statusCode, body: luaran } = await agent
      .post("/kegiatan/10/luaran")
      .send(newLuaran)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran).toMatchObject({ ...newLuaran, editable: true });
    await periodeTable.reset();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/luaran/:id_luaran/realisasi", () => {
  test("It should response 200 OK and return kegiatan luaran when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const realisasi = { id_luaran: 1 };
    const { statusCode, body: luaran } = await agent
      .post("/kegiatan/10/luaran/4/realisasi")
      .send(realisasi)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran).toMatchObject({ ...realisasi, judul: "The effect of long sleep" });
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/luaran/:id_kegiatan_luaran/realisasi", () => {
  test("It should response 200 OK and return kegiatan luaran when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const { statusCode, body: luaran } = await agent
      .delete("/kegiatan/10/luaran/5/realisasi")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(luaran).toMatchObject({ id_luaran: null });

    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/luaran/:id_kegiatan_luaran", () => {
  test("It'd 403 Forbidden when deleting luaran wajib", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { body } = await agent
      .delete("/kegiatan/1/luaran/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(body).toEqual({ error: msg.KLU_FBD_WAJ });
    await periodeTable.reset();
  });

  test("It should response 200 OK and return kegiatan luaran when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/luaran/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
