const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "blog";

// ==================================================================================

const controller = require("../controllers/BlogController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}`,
  token_validation,
  only_tu,
  controller.postingBeritaSekolah
);

router.post(`${endpoint}/v1/${topic}/list`, controller.showPagination);
router.put(
  `${endpoint}/v1/${topic}`,
  token_validation,
  only_tu,
  controller.updateBeritaSekolah
);
router.delete(
  `${endpoint}/v1/${topic}/:prefix`,
  token_validation,
  only_tu,
  controller.deleteBeritaSekolah
);

// ==================================================================================

module.exports = router;
