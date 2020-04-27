const HTTPStatus = require("http-status");
const { DOSEN1_CRED, ADMIN_CRED } = require("./consts");
const { get_auth } = require("./helpers");
const agent = require("supertest")(require("../app"));
const periodeTable = require("./periode.table");

describe("Route GET /kegiatan/:id_kegiatan/reviewer", () => {
  test("It'd 200 OK and return reviewer ", async () => {
    const { statusCode, body: reviewer } = await agent
      .get("/kegiatan/1/reviewer")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(reviewer[0]).toMatchObject({ id_user: 4, username: "dosen4" });
    expect(reviewer[1]).toMatchObject({ id_user: 5 });
  });
});

describe("Route POST /kegiatan/:id_kegiatan/reviewer", () => {
  test("It should response 200 OK and return kegiatan reviewer when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 3 }, 0);
    const newReviewer = { id_user: 4 };
    const { statusCode, body: reviewer } = await agent
      .post("/kegiatan/10/reviewer")
      .send(newReviewer)
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(reviewer).toMatchObject({
      ...newReviewer,
      username: "dosen4",
      nama_user: "Dosen #4",
    });
    await periodeTable.reset();
  });
});

describe("Route DELETE /kegiatan/:id_kegiatan/reviewer/:id_kegiatan_reviewer", () => {
  test("It should response 200 OK and return kegiatan reviewer when dosen", async () => {
    await periodeTable.replace({ tahun: "2020", id_program: "01", id_tahap: 3 }, 0);
    const { statusCode } = await agent
      .delete("/kegiatan/10/reviewer/10")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    await periodeTable.reset();
  });
});
