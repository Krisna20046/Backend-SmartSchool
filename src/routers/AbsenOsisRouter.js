const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "absen-osis";

// ==================================================================================

const controller = require("../controllers/AbsenOsisController");
const only_osis = require("../middlewares/only_osis");

const token_validation = require("../middlewares/token_validation");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/hadir`,
  token_validation,
  only_osis,
  controller.hadir
);
router.post(
  `${endpoint}/v1/${topic}/tidak-hadir`,
  token_validation,
  only_osis,
  controller.tidakHadir
);

router.post(
  `${endpoint}/v1/${topic}`,
  token_validation,
  controller.showPagination
);

// router.get(`${endpoint}/v1/${topic}`, controller.show);
// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
