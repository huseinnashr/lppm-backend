const HTTPStatus = require("http-status");
const fs = require("fs");

const stringAgentRequest = (agent, method, endpoint) => {
  switch (method) {
    case "GET":
      return agent.get(endpoint);
    case "POST":
      return agent.post(endpoint);
    case "PUT":
      return agent.put(endpoint);
    case "PATCH":
      return agent.patch(endpoint);
    case "DELETE":
      return agent.delete(endpoint);
  }
};

const test_not_auth_unauthorized = (agent, method, endpoint) => {
  test("It should not accept request from unauthorized user", async () => {
    const { statusCode } = await stringAgentRequest(agent, method, endpoint);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
  });
};

const test_auth_forbidden = (agent, method, endpoint, CRED) => {
  test("It should not accept request from " + CRED.nama_role + " role", async () => {
    const { headers } = await agent.post("/login").send(CRED);
    const { statusCode } = await stringAgentRequest(agent, method, endpoint).set(
      "cookie",
      headers["set-cookie"]
    );
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
  });
};

const get_auth = async (agent, CRED) => {
  const { headers } = await agent.post("/login").send(CRED);
  return headers["set-cookie"];
};

const delete_uploaded_file = (url, folder) => {
  const url_segments = url.split("/");
  const id = url_segments[url_segments.length - 1];
  fs.unlinkSync(folder + id);
};

module.exports = {
  test_not_auth_unauthorized,
  test_auth_forbidden,
  get_auth,
  delete_uploaded_file,
};
