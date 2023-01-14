const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "blog-osis";

// ==================================================================================

const controller = require("../controllers/BlogOsisController");

const token_validation = require("../middlewares/token_validation");
const only_osis = require("../middlewares/only_osis");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}`,
  token_validation,
  only_osis,
  controller.postingBeritaSekolah
);

router.post(`${endpoint}/v1/${topic}/list`, controller.showPagination);
router.put(
  `${endpoint}/v1/${topic}`,
  token_validation,
  only_osis,
  controller.updateBeritaSekolah
);
router.delete(
  `${endpoint}/v1/${topic}/:prefix`,
  token_validation,
  only_osis,
  controller.deleteBeritaSekolah
);

// ==================================================================================

module.exports = router;
