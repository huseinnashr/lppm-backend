const HTTPStatus = require("http-status");
const { ADMIN_CRED, DOSEN1_CRED } = require("./consts");
const {
  test_not_auth_unauthorized,
  test_auth_forbidden,
  get_auth,
  delete_uploaded_file,
} = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /user", () => {
  test_not_auth_unauthorized(agent, "GET", "/user");
  test_auth_forbidden(agent, "GET", "/user", DOSEN1_CRED);

  test("It should response 200 OK and return users when admin", async () => {
    const { statusCode, body: users } = await agent
      .get("/user")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Array.isArray(users) && (users.length == 0 || users[0]["id_user"])).toBeTruthy();
  });
});

describe("Route POST /user", () => {
  test_not_auth_unauthorized(agent, "POST", "/user");
  test_auth_forbidden(agent, "POST", "/user", DOSEN1_CRED);

  test("It should response 422 UNPROCESSABLE_ENTITY and error when username exist", async () => {
    const payload = {
      username: "dosen1",
      password: "wasdwasd",
      id_role: 1,
      id_program_studi: 1,
    };
    const { statusCode, body } = await agent
      .post("/user")
      .send(payload)
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.UNPROCESSABLE_ENTITY);
    expect(body).toMatchObject({ error: "Username sudah dipakai" });
  });

  test("It should response 200 OK and return user when admin", async () => {
    const payload = {
      username: "new_user_1",
      password: "wasdwasd",
      id_role: 1,
      id_program_studi: 1,
    };
    const { statusCode, body: user } = await agent
      .post("/user")
      .send(payload)
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toHaveProperty("id_user");
    delete payload.password;
    expect(user).toMatchObject(payload);
  });
});

describe("Route GET /user/:id_user", () => {
  test_not_auth_unauthorized(agent, "GET", "/user/1");

  test("It should response 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent
      .get("/user/not_exist")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "User tidak ditemukan" });
  });
  test("It should response 200 OK and return user when exist", async () => {
    const { statusCode, body: user } = await agent
      .get("/user/1")
      .set("cookie", await get_auth(agent, DOSEN1_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(user).toMatchObject({ id_user: 1 });
  });
});

describe("Route PATCH /user/:id_user", () => {
  test("It should response 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent
      .patch("/user/not_exist")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "User tidak ditemukan" });
  });

  test("It should response 422 UNPROCESSABLE_ENTITY and error when username exist", async () => {
    const { statusCode, body } = await agent
      .patch("/user/6")
      .send({ username: "dosen1" })
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.UNPROCESSABLE_ENTITY);
    expect(body).toMatchObject({ error: "Username sudah dipakai" });
  });

  test("It should response 200 OK and return user on correct payload", async () => {
    const { statusCode, body } = await agent
      .patch("/user/6")
      .send({ username: "dosen3e", password: "wasdwasd" })
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toMatchObject({ id_user: 6, username: "dosen3e" });
  });
});

describe("Route DELETE /user/:id_user", () => {
  test_auth_forbidden(agent, "DELETE", "/user/31", DOSEN1_CRED);

  test("It should response 200 OK and on correct payload", async () => {
    const { statusCode } = await agent
      .delete("/user/31")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
  });
});

describe("Route GET /profile_picture/:id_profile_picture", () => {
  test_not_auth_unauthorized(agent, "GET", "/profile_picture/id");

  test("It should response 400 Bad Request and return error when bad id", async () => {
    const { statusCode, body } = await agent
      .get("/profile_picture/bad_param")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.BAD_REQUEST);
    expect(body).toMatchObject({ error: "Sepesifikasi request tidak bisa dipenuhi" });
  });
  test("It should response 404 Not Found and return error when not exist", async () => {
    const { statusCode, body } = await agent
      .get("/profile_picture/ed7f4836c70302f37508119a841165e4")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.NOT_FOUND);
    expect(body).toMatchObject({ error: "File tidak ditemukan" });
  });
  test("It should response 200 OK and return buffer when exist", async () => {
    const { statusCode, body } = await agent
      .get("/profile_picture/ed7f4836c70302f37508119a841165e3")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(Buffer.isBuffer(body)).toBeTruthy();
  });
});

describe("Route POST /profile_picture/", () => {
  test_not_auth_unauthorized(agent, "POST", "/profile_picture");

  test("It should response 200 OK and return url on correct payload", async () => {
    const { statusCode, body } = await agent
      .post("/profile_picture")
      .attach("profile_picture", "./test/files/profile-pictures.jpg")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(body).toHaveProperty("url");
    delete_uploaded_file(body.url, "./uploads/profile_pictures/");
  });
});
