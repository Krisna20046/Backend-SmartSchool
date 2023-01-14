const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "jadwal-kegiatan-osis";

// ==================================================================================

const controller = require("../controllers/JadwalKegiatanOsisController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");
const only_guru = require("../middlewares/only_guru");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/tambah`,
  token_validation,
  only_tu,
  only_guru,
  controller.insert
);
router.post(`${endpoint}/v1/${topic}`, controller.showPagination);
router.put(
  `${endpoint}/v1/${topic}/edit`,
  token_validation,
  only_tu,
  only_guru,
  controller.update
);
router.delete(
  `${endpoint}/v1/${topic}/:prefix`,
  token_validation,
  only_tu,
  only_guru,
  controller.deleteJadwalKegiatanOsis
);

// ==================================================================================

module.exports = router;
