const HTTPStatus = require("http-status");
const { DOSEN1_CRED, DOSEN4_CRED } = require("./consts");
const { test_auth_forbidden, get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");
const msg = require("../messages");

describe("Route GET /kegiatan/:id_kegiatan/tahap/:id_tahap/review", () => {
  test("It'd 200 OK and return review ", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 0);
    const { statusCode, body: review } = await agent
      .get("/kegiatan/1/tahap/4/review")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(review[0]).toMatchObject({ editable: true, feedback: "Keg #1 Rev #1 Tahap 4" });
    expect(review[1]).toMatchObject({
      editable: false,
      message: "Tidak punya akses review",
      feedback: "Keg #1, Rev #2, Tahap 4",
    });
    await periodeTable.reset();
  });
});

describe("Route PUT /kegiatan/:id_kegiatan/tahap/:id_tahap/feedback/:id_kegiatan_reviewer", () => {
  test_auth_forbidden(agent, "PUT", "/kegiatan/10/tahap/4/feedback/11", DOSEN1_CRED);

  test("It should response 200 OK and return kegiatan review when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 2);
    const { statusCode, body } = await agent
      .put("/kegiatan/10/tahap/4/feedback/11")
      .send({ feedback: "Feedback #10 PUT" })
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toMatchObject({ error: "Tidak dalam periode Review Usulan" });
    await periodeTable.reset();
  });

  test("It should response 200 OK and return kegiatan review when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 0);
    const newFeedback = { feedback: "Feedback #10 PUT" };
    const { statusCode, body: review } = await agent
      .put("/kegiatan/10/tahap/4/feedback/11")
      .send(newFeedback)
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(review).toMatchObject(newFeedback);
    await periodeTable.reset();
  });
});

describe("Route PUT /kegiatan/:id_kegiatan/tahap/:id_tahap/grade/:id_kegiatan_reviewer", () => {
  test("It should response 200 OK and return kegiatan review when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 4 }, 0);
    const newGrade = [["040201", "04220101"]];
    const { statusCode, body: grade } = await agent
      .put("/kegiatan/10/tahap/4/grade/11")
      .send(newGrade)
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(grade).toMatchObject([["11", "4", ...newGrade[0]]]);
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/tahap/:id_tahap/feedback/:id_kegiatan_reviewer", () => {
  test("It'd 404 Not Found when deleting non existing feedback", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 7 }, 0);
    const { body } = await agent
      .delete("/kegiatan/10/tahap/not_exist/feedback/11")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(body).toMatchObject({ error: msg.KRV_NFO });
    await periodeTable.reset();
  });

  test("It should response 200 OK and return kegiatan review when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 7 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/tahap/7/feedback/11")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/tahap/:id_tahap/grade/:id_kegiatan_reviewer", () => {
  test("It should response 200 OK and return kegiatan review when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 7 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/tahap/7/grade/11")
      .set("cookie", await get_auth(agent, DOSEN4_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
