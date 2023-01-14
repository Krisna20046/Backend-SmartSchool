const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "/apk";

// ==================================================================================

const controller = require("../controllers/ApkController");

const token_validation = require("../middlewares/token_validation");
const only_superman = require("../middlewares/only_superman");

// ==================================================================================

router.get(`${topic}/now`, controller.nowVersion);
router.get(`${topic}/download/latest`, controller.downloadLatest);

router.get(`${topic}/check-version/:version`, controller.checkVersion);

router.get(
  `${topic}/list`,
  token_validation,
  only_superman,
  controller.listApk
);
router.delete(
  `${topic}/:version`,
  token_validation,
  only_superman,
  controller.delete
);

// ==================================================================================

module.exports = router;
