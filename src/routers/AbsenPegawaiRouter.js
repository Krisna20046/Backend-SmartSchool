const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "absen-pegawai";

// ==================================================================================

const controller = require("../controllers/AbsenPegawaiController");
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

// ==================================================================================

module.exports = router;
