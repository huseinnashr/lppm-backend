const HTTPStatus = require("http-status");

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
  test("It should response 401 Unauthorized when not authenticated", async () => {
    const { statusCode } = await stringAgentRequest(agent, method, endpoint);
    expect(statusCode).toBe(HTTPStatus.UNAUTHORIZED);
  });
};

const test_auth_forbidden = (agent, method, endpoint, CRED) => {
  test("It should response 403 Forbidden when " + CRED.nama_role, async () => {
    const { headers } = await agent.post("/login").send(CRED);
    const { statusCode } = await stringAgentRequest(agent, method, endpoint).set(
      "cookie",
      headers["set-cookie"]
    );
    expect(statusCode).toBe(HTTPStatus.FORBIDDEN);
  });
};

module.exports = {
  test_not_auth_unauthorized,
  test_auth_forbidden,
};
