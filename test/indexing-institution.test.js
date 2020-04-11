const HTTPStatus = require("http-status");
const { ADMIN_CRED, INDEXING_INSTITUTION_LENGTH } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /indexing-institution", () => {
  test_not_auth_unauthorized(agent, "GET", "/indexing-institution");

  test("It should response 200 OK and return indexing institution", async () => {
    const { statusCode, body: indexingInstitution } = await agent
      .get("/indexing-institution")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(indexingInstitution.length).toEqual(INDEXING_INSTITUTION_LENGTH);
    expect(indexingInstitution[1]).toEqual({
      id_indexing_institution: "02",
      nama_indexing_institution: "Google Scholar",
    });
  });
});
