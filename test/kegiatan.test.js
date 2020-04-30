const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED, DOSEN4_CRED, PIMPINAN1_CRED } = require("./consts");
const {
  test_not_auth_unauthorized,
  test_auth_forbidden,
  get_auth,
  delete_uploaded_file,
} = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/dosen", () => {
  test_auth_forbidden(agent, "GET", "/kegiatan/dosen", ADMIN_CRED);

  test("It'd 200 OK and ret kegiatan arr and light=GREEN when periode not started", async () => {
    const { statusCode, body: kegiatan } = await agent
      .get("/kegiatan/dosen")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(kegiatan.length).toBe(2);
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

  test("It'd ret kegiatan light=GREEN on assigned reviewer on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 3 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Reviewer telah di assign");
  });

  test("It'd ret kegiatan light=ORANGE on unassigned reviewer on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/4")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Reviewer belum di assign");
  });

  test("It'd ret kegiatan light=RED on unassigned kegiatan after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 3 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/4")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Reviewer tidak di assign");
  });

  test("It'd ret kegiatan light=GREEN on reviewed usulan on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Usulan telah di review");
  });

  test("It'd ret kegiatan light=ORANGE on unreviewed usulan on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/5")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Usulan belum di review");
  });

  test("It'd ret kegiatan light=RED on unreviewed usulan after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/5")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Usulan tidak di review");
  });

  test("It'd ret kegiatan light=ORANGE on perbaikan usulan on the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 5 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Periode revisi usulan");
  });

  test("It'd ret kegiatan light=GREEN on perbaikan usulan after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 5 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Periode revisi telah selesai");
  });

  test("It'd ret kegiatan light=GREEN on uploaded kemajuan usulan on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan telah di upload");
  });

  test("It'd ret kegiatan light=ORANGE on uploaded kemajuan on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan belum di upload");
  });

  test("It'd ret kegiatan light=RED on uploaded kemajuan after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/6")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan tidak di upload");
  });

  test("It'd ret kegiatan light=GREEN on reviewed laporan kemajuan on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 7 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan telah di review");
  });

  test("It'd ret kegiatan light=ORANGE on unreviewed laporan kemajuan on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/7")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan belum di review");
  });

  test("It'd ret kegiatan light=RED on unreviewed laporan kemajuan after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 7 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/7")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Laporan Kemajuan tidak di review");
  });

  test("It'd ret kegiatan light=GREEN on uploaded laporan akhir on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 8 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Laporan Akhir telah di upload");
  });

  test("It'd ret kegiatan light=ORANGE on unuploaded laporan akhir on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/8")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Laporan Akhir belum di upload");
  });

  test("It'd ret kegiatan light=RED on unuploaded laporan akhir after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 8 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/8")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Laporan Akhir tidak di upload");
  });

  test("It'd ret kegiatan light=GREEN on reviewed laporan akhir on/after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 9 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("GREEN");
    expect(kegiatan["message"]).toBe("Laporan Akhir telah di review");
  });

  test("It'd ret kegiatan light=ORANGE on unreviewed laporan akhir on the periode", async () => {
    const { body: kegiatan } = await agent
      .get("/kegiatan/9")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("ORANGE");
    expect(kegiatan["message"]).toBe("Laporan Akhir belum di review");
  });

  test("It'd ret kegiatan light=RED on unreviewed laporan akhir after the periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 9 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/9")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(kegiatan["light"]).toBe("RED");
    expect(kegiatan["message"]).toBe("Laporan Akhir tidak di review");
  });
});

describe("Check editable rule of /kegiatan/:id_kegiatan", () => {
  afterAll(async () => {
    await periodeTable.reset();
  });

  test("Not a kegiatan owner", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/9")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    const editable = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 1);
    expect(editable["message"]).toBe("Bukan owner kegiatan");
  });

  test("Owner kegiatan but not on periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, -2);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    const editable = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 1);
    expect(editable["message"]).toBe("Tidak dalam periode Usulan Baru");
  });

  test("Owner kegiatan and on periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    const editable1 = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 1);
    expect(editable1["message"]).toBe(null);
    const editable2 = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 2);
    expect(editable2["message"]).toBe("Bukan Pimpinan Fakultas");
    const editable3 = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 3);
    expect(editable3["message"]).toBe("Bukan Admin");
    const editable4 = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 4);
    expect(editable4["message"]).toBe("Bukan reviewer kegiatan");
  });

  test("Admin and on periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 2 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, PIMPINAN1_CRED));
    const editable = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 2);
    expect(editable["message"]).toBe(null);
  });

  test("Admin and on periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 3 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    const editable = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 3);
    expect(editable["message"]).toBe(null);
  });

  test("Reviewer and on periode", async () => {
    periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 0);
    const { body: kegiatan } = await agent
      .get("/kegiatan/1")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    const editable = kegiatan["editables"].find(({ id_tahap }) => id_tahap == 4);
    expect(editable["message"]).toBe(null);
  });
});

describe("Route POST /kegiatan", () => {
  test("It should response 200 OK and return kegiatan when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
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
    await periodeTable.reset();
  });
});

describe("Route PATCH /kegiatan/:id_kegiatan", () => {
  test_auth_forbidden(agent, "PATCH", "/kegiatan/1", DOSEN4_CRED);

  test("It should response 200 OK and return kegiatan when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const updatedKegiatan = {
      id_tkt: 5,
    };
    const { statusCode, body: kegiatan } = await agent
      .patch("/kegiatan/1")
      .send(updatedKegiatan)
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(kegiatan).toMatchObject(updatedKegiatan);
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan", () => {
  test("It should response 200 OK", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/11")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});

describe("Route GET kegiatan/:id_kegiatan/proposal/:proposal", () => {
  test("It should response 200 OK and return buffer when exist", async () => {
    const { statusCode, body } = await agent
      .get("/kegiatan/1/proposal/972c97bdc47dfc8def0e74c55da0bbfd")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Buffer.isBuffer(body)).toBeTruthy();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/proposal", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/proposal")
      .attach("proposal", "./test/files/proposal.pdf")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toHaveProperty("proposal");
    delete_uploaded_file(body.proposal, "./uploads/proposal/");
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/proposal/:proposal", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 1 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/12/proposal/972c97bdc47dfc8def0e74c55da0bbfe")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});

describe("Route GET kegiatan/:id_kegiatan/laporan-kemajuan/:laporan_kemajuan", () => {
  test("It should response 200 OK and return buffer when exist", async () => {
    const { statusCode, body } = await agent
      .get("/kegiatan/1/laporan-kemajuan/ea1a4f7d22e24417dfa53e462e8d52aa")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Buffer.isBuffer(body)).toBeTruthy();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/laporan-kemajuan", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/laporan-kemajuan")
      .attach("laporan_kemajuan", "./test/files/laporan-kemajuan.pdf")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toHaveProperty("laporan_kemajuan");
    delete_uploaded_file(body.laporan_kemajuan, "./uploads/laporan-kemajuan/");
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/laporan-kemajuan/:laporan_kemajuan", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 6 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/12/laporan-kemajuan/ea1a4f7d22e24417dfa53e462e8d52ab")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});

describe("Route GET kegiatan/:id_kegiatan/laporan-akhir/:laporan_akhir", () => {
  test("It should response 200 OK and return buffer when exist", async () => {
    const { statusCode, body } = await agent
      .get("/kegiatan/1/laporan-akhir/b7ca1276cb62dc3e2663592abf3365a0")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Buffer.isBuffer(body)).toBeTruthy();
  });
});

describe("Route POST /kegiatan/:id_kegiatan/laporan-akhir", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 8 }, 0);
    const { statusCode, body } = await agent
      .post("/kegiatan/10/laporan-akhir")
      .attach("laporan_akhir", "./test/files/laporan-akhir.pdf")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toHaveProperty("laporan_akhir");
    delete_uploaded_file(body.laporan_akhir, "./uploads/laporan-akhir/");
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/laporan-akhir/:laporan_akhir", () => {
  test("It should response 200 OK and return url on correct payload", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 8 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/12/laporan-akhir/b7ca1276cb62dc3e2663592abf3365a1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
