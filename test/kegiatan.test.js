const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED } = require("./consts");
const { test_not_auth_unauthorized, test_auth_forbidden, get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/dosen", () => {
  test_auth_forbidden(agent, "GET", "/kegiatan/dosen", ADMIN_CRED);

  test("It'd 200 OK and ret kegiatan arr and light=GREEN when periode not started", async () => {
    const { statusCode, body: kegiatan } = await agent
      .get("/kegiatan/dosen")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(kegiatan.length).toBe(1);
    expect(kegiatan[0]).toMatchObject({
      judul: "Are we alone in this universe?",
      light: "GREEN",
      message: "Menunggu periode submission",
    });
    expect(kegiatan[0]["anggota"][1]).toMatchObject({ id_user: 2, posisi: "ANGGOTA" });
  });
});

describe("Route GET /kegiatan/:id_kegiatan", () => {
  afterAll(async () => {
    await periodeTable.reset();
  });

  test_not_auth_unauthorized(agent, "GET", "/kegiatan/1");

  test("It'd 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent
      .get("/kegiatan/not_exist")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "Kegiatan tidak ditemukan" });
  });

  test("It'd ret kegiatan light=GREEN submit'd kegiatan on/after submission periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Usulan telah di submit");
  });

  test("It'd ret kegiatan light=ORANGE on unsubmit'd kegiatan on submission periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/2")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Usulan belum di submit");
  });

  test("It'd ret kegiatan light=RED on unsubmit'd kegiatan after submission periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/2")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Usulan tidak di submit");
  });

  test("It'd ret kegiatan light=GREEN on approved kegiatan on/after approval periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 2 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Usulan di approve");
  });

  test("It'd ret kegiatan light=ORANGE on unpproved kegiatan on approval periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/3")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Usulan belum di approve");
  });

  test("It'd ret kegiatan light=RED on rejected kegiatan on/after approval periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 2 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/3")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Usulan ditolak");
  });
});

describe("Route POST /kegiatan", () => {
  afterAll(async () => {
    await periodeTable.reset();
  });

  test_auth_forbidden(agent, "POST", "/kegiatan", ADMIN_CRED);

  test("It should response 200 OK and return kegiatan when dosen", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const newKegiatan = {
      judul: "Don't Give Up on Me!",
      id_skema: "0101",
      id_jenis_topik: "101010",
      id_sbk: 1,
      id_tkt: 2,
      lama: 1,
      tahun: 2020,
    };
    const { statusCode, body: kegiatan } = await agent
      .post("/kegiatan")
      .send(newKegiatan)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(kegiatan).toMatchObject({
      ...newKegiatan,
      light: "ORANGE",
      message: "Usulan belum di submit",
    });
    expect(kegiatan["anggota"][0]).toMatchObject({ username: DOSEN1_CRED.username });
  });
});
