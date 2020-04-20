const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED, DOSEN2_CRED, UNKNOWN_CRED, WRONG_CRED } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route POST /login", () => {
  test("It should response 200 OK and return user on admin credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(ADMIN_CRED);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user.username).toBe("admin");
  });
  test("It should response 200 OK and return user on dosen credential", async () => {
    const { statusCode, body: user } = await agent.post("/login").send(DOSEN1_CRED);
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ username: "dosen1", id_jabatan_fungsional: 11 });
  });
  test("It should response 401 Unauthorized and return error on unknown credential", async () => {
    const { statusCode, body } = await agent.post("/login").send(UNKNOWN_CRED);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
    expect(body.error).toBe("User tidak ditemukan");
  });
  test("It should response 401 Unauthorized and return error on wrong password", async () => {
    const { statusCode, body } = await agent.post("/login").send(WRONG_CRED);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
    expect(body.error).toBe("Password salah");
  });
});

describe("Route POST /change-role", () => {
  test_not_auth_unauthorized(agent, "GET", "/program");

  test("It should response 403 Forbidden on role to admin", async () => {
    const { statusCode, body } = await agent
      .post("/change-role")
      .send({ id_role: 1 })
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toEqual({ error: "Tidak bisa ganti role dari/jadi admin" });
  });

  test("It should response 422 Unprocessable Entity on role to unknown", async () => {
    const { statusCode, body } = await agent
      .post("/change-role")
      .send({ id_role: "not-exist" })
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.UNPROCESSABLE_ENTITY);
    expect(body).toEqual({ error: "Role baru tidak ditemukan" });
  });

  test("It should response 200 OK and return user on role to dosen", async () => {
    const { statusCode, body: user } = await agent
      .post("/change-role")
      .send({ id_role: 2 })
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ nama_role: "dosen" });
  });

  test("It should response 200 OK and return user on role to reviewer", async () => {
    const { statusCode, body: user } = await agent
      .post("/change-role")
      .send({ id_role: 3 })
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ nama_role: "reviewer" });
  });

  test("It'd response 403 Forbidden on role to pimpinan fakultas for non JS dekan", async () => {
    const { statusCode, body } = await agent
      .post("/change-role")
      .send({ id_role: 4 })
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
    expect(body).toEqual({ error: "Tidak sesuai dengan jabatan struktural" });
  });

  test("It'd response 200 OK and user on role to pimpinan fakultas for JS dekan", async () => {
    const { statusCode, body: user } = await agent
      .post("/change-role")
      .send({ id_role: 4 })
      .set("cookie", await get_auth(agent, DOSEN2_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ nama_role: "pimpinan_fakultas" });
  });
});

describe("Route POST /logout", () => {
  test("It should response 200 OK", async () => {
    const { statusCode } = await agent.post("/logout");
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});
