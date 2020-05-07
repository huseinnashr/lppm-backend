const HTTPStatus = require("http-status");
const { __get: getKegiatan } = require("./kegiatan");
const msg = require("../messages");

const ALL_KEGIATAN_REVIEW_QUERY = (where) => `
  SELECT
    kr.*,
    t.id_tahap,
    kf.feedback,
    JSON_ARRAYAGG(JSON_ARRAY(kg.id_review_question, kg.id_review_answer)) AS grade
  FROM
    kegiatan_reviewer AS kr
  JOIN tahap AS t 
    ON t.id_tahap IN (4, 7, 9)
  LEFT JOIN kegiatan_feedback AS kf
    ON kf.id_kegiatan_reviewer = kr.id_kegiatan_reviewer AND kf.id_tahap = t.id_tahap
  LEFT JOIN kegiatan_grade AS kg
    ON kg.id_kegiatan_reviewer = kr.id_kegiatan_reviewer AND kg.id_tahap = t.id_tahap
   ${where} 
  GROUP BY kr.id_kegiatan_reviewer, t.id_tahap
`;

const __addEditable = ({ kegiatan, reviews, user }) => {
  const { id_user } = user;
  return reviews.map((r) => {
    const { editable: pEditable, message: pMessage } = kegiatan["editables"].find(
      (e) => e.id_tahap == r.id_tahap
    );
    const is_reviewer = r.id_user == id_user;
    return {
      ...r,
      editable: pEditable ? is_reviewer : false,
      message: pEditable ? (is_reviewer ? null : "Tidak punya akses review") : pMessage,
    };
  });
};

const getAll = async (req, res) => {
  const { id_kegiatan, id_tahap } = req.params;
  const kegiatan = await getKegiatan(req.db, { id_kegiatan, user: req.session.user });
  const reviews = await req.db.asyncQuery(
    ALL_KEGIATAN_REVIEW_QUERY("WHERE kr.id_kegiatan = ? AND t.id_tahap = ?"),
    [id_kegiatan, id_tahap]
  );
  res.status(HTTPStatus.OK).send(__addEditable({ kegiatan, reviews, user: req.session.user }));
};

const __get = async (db, { id_kegiatan, id_kegiatan_reviewer, id_tahap, user, edit = false }) => {
  const kegiatan = await getKegiatan(db, { id_kegiatan, user });
  const reviews = await db.asyncQuery(
    ALL_KEGIATAN_REVIEW_QUERY("WHERE kr.id_kegiatan_reviewer = ? AND t.id_tahap = ?"),
    [id_kegiatan_reviewer, id_tahap]
  );
  if (reviews.length == 0) throw { status: HTTPStatus.NOT_FOUND, message: msg.KRV_NFO };

  review = __addEditable({ kegiatan, reviews, user })[0];

  if (edit && !review.editable) throw { status: HTTPStatus.FORBIDDEN, message: review.message };

  return review;
};

const replaceFeedback = async (req, res) => {
  const { id_tahap, id_kegiatan_reviewer } = req.params;
  const { feedback } = req.body;

  await __get(req.db, { ...req.params, user: req.session.user, edit: true });

  const newFeedback = { id_kegiatan_reviewer, id_tahap, feedback };
  await req.db.asyncQuery("REPLACE INTO kegiatan_feedback SET ?", newFeedback);

  res.status(HTTPStatus.OK).send(newFeedback);
};

const replaceGrade = async (req, res) => {
  const { id_tahap, id_kegiatan_reviewer } = req.params;
  const grades = req.body;

  await __get(req.db, { ...req.params, user: req.session.user, edit: true });

  await req.db.asyncQuery(
    "DELETE FROM kegiatan_grade WHERE id_kegiatan_reviewer = ? AND id_tahap = ?",
    [id_kegiatan_reviewer, id_tahap]
  );

  const newGrade = grades.map(([id_review_question, id_review_answer]) => {
    return [id_kegiatan_reviewer, id_tahap, id_review_question, id_review_answer];
  });
  await req.db.asyncQuery("INSERT INTO kegiatan_grade VALUES ?", [newGrade]);

  res.status(HTTPStatus.OK).send(newGrade);
};

const removeFeedback = async (req, res) => {
  const { id_kegiatan_reviewer, id_tahap } = req.params;
  await __get(req.db, { ...req.params, user: req.session.user, edit: true });
  await req.db.asyncQuery(
    "DELETE FROM kegiatan_feedback WHERE id_kegiatan_reviewer = ? AND id_tahap = ?",
    [id_kegiatan_reviewer, id_tahap]
  );
  res.status(HTTPStatus.OK).send("");
};

const removeGrade = async (req, res) => {
  const { id_kegiatan_reviewer, id_tahap } = req.params;
  await __get(req.db, { ...req.params, user: req.session.user, edit: true });
  await req.db.asyncQuery(
    "DELETE FROM kegiatan_grade WHERE id_kegiatan_reviewer = ? AND id_tahap = ?",
    [id_kegiatan_reviewer, id_tahap]
  );
  res.status(HTTPStatus.OK).send("");
};

module.exports = {
  getAll,
  replaceFeedback,
  replaceGrade,
  removeFeedback,
  removeGrade,
};
