const HTTPStatus = require("http-status");
const { DOSEN1_CRED, DOSEN3_CRED, DOSEN4_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");
const msg = require("../messages");

describe("Route GET /kegiatan/:id_kegiatan/anggota", () => {
  test("It'd 200 OK and return anggota ", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode, body: anggota } = await agent
      .get("/kegiatan/1/anggota")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(anggota[0]).toMatchObject({
      id_user: 1,
      posisi: "KETUA",
      editable: false,
      editable_stat: false,
    });
    expect(anggota[1]).toMatchObject({
      id_user: 2,
      posisi: "ANGGOTA",
      editable: true,
      editable_stat: false,
    });
    await periodeTable.reset();
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
      editable: true,
      editable_stat: false,
    });
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota", () => {
  test("It'd 403 Forbidden when deleting ketua", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode, body } = await agent
      .delete("/kegiatan/10/anggota/5")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toMatchObject({ error: msg.KAN_FBD_KET });
    await periodeTable.reset();
  });

  test("It'd 404 Not Found when deleting non existing anggota", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { body } = await agent
      .delete("/kegiatan/10/anggota/not_exist")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(body).toMatchObject({ error: msg.KAN_NFO });
    await periodeTable.reset();
  });

  test("It should response 200 OK and return kegiatan anggota when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/anggota/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/anggota/:id_kegiatan_anggota/status/:[accept/reject]", () => {
  test("It'd 403 Forbidden when not on periode", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 2);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/anggota/5/status/accept")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body.error.startsWith(msg.KEG_FBD_PER)).toBeTruthy();
    await periodeTable.reset();
  });

  test("It'd 403 Forbidden on already accepted anggota", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/anggota/5/status/accept")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toMatchObject({ error: msg.KAN_FBD_ACC });
    await periodeTable.reset();
  });

  test("It'd 403 Forbidden on accepting other anggota", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/anggota/7/status/accept")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toMatchObject({ error: msg.KAN_FBD_SLF });
    await periodeTable.reset();
  });

  test("It should response 200 OK on accepting", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .post("/kegiatan/10/anggota/7/status/accept")
      .set("cookie", await get_auth(agent, DOSEN3_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });

  test("It should response 200 OK on rejecting", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .post("/kegiatan/10/anggota/8/status/reject")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
