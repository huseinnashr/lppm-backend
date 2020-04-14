const HTTPStatus = require("http-status");
const { ADMIN_CRED } = require("./consts");
const { get_auth, test_not_auth_unauthorized } = require("./helpers");
const agent = require("supertest")(require("../app"));

describe("Route GET /review-question", () => {
  test_not_auth_unauthorized(agent, "GET", "/review-question");

  test("It should response 200 OK and return review question", async () => {
    const { statusCode, body: reviewQuestion } = await agent
      .get("/review-question")
      .set("cookie", await get_auth(agent, ADMIN_CRED));
    expect(statusCode).toBe(HTTPStatus.OK);
    expect(reviewQuestion[1]).toMatchObject({
      id_review_question: "041202",
      ids_skema: "10002,10003",
      id_tahap: 4,
      review_question:
        "Jurnal internasional dan/atau jurnal nasional terakreditasi dan/atau prosiding internasional terindeks",
      bobot: 1,
      max_score: 1,
    });
    expect(reviewQuestion[1]["answers"][1]).toMatchObject({
      id_review_answer: "04120202",
      review_answer:
        "Memiliki publikasi jurnal internasional dan/atau jurnal nasional terakreditasi(peringkat satu dan peringkat dua) dan/atau prosiding internasional terindeks sebagai penulis pertama atau corresponding author 2 artikel",
      score: 2,
    });
  });
});
