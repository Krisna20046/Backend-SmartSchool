const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "absen-murid";

// ==================================================================================

const controller = require("../controllers/AbsenMuridController");
const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/hadir`,
  token_validation,
  controller.hadir
);
router.post(
  `${endpoint}/v1/${topic}/pulang`,
  token_validation,
  controller.pulang
);

router.post(
  `${endpoint}/v1/${topic}`,
  token_validation,
  controller.showPagination
);

// router.post(
//   `${endpoint}/v1/${topic}/foto`,
//   token_validation,
//   controller.fotoabsenMurid
// );

// // list yang absen di sekolah ini (pagination)
// router.post(
//   `${endpoint}/v1/${topic}/list`,
//   token_validation,
//   only_tu,
//   controller.showPagination
// );

// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
