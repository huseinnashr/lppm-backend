const HTTPStatus = require("http-status");

const getAll = async (req, res) => {
  const results = await req.db.asyncQuery(
    "SELECT rq.*, CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id_review_answer', ra.`id_review_answer`, 'review_answer', ra.`review_answer`, 'score', ra.`score`) ORDER BY ra.`id_review_answer` ASC SEPARATOR ', '), ']') AS JSON) AS answers FROM review_question AS rq JOIN review_answer AS ra ON ra.`id_review_question` = rq.`id_review_question` GROUP BY rq.`id_review_question`"
  );
  res.status(HTTPStatus.OK).send(results);
};

module.exports = {
  getAll,
};
