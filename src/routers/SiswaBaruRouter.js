const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "siswa-baru";

// ==================================================================================

const controller = require("../controllers/SiswaBaruController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");

// ==================================================================================

//-> Web (non login)

// form formulir pendaftaran
router.post(`${endpoint}/v1/${topic}`, controller.formPendaftaran);

// form formulir pendaftaran mutasi
router.post(`${endpoint}/v1/${topic}/mutasi`, controller.formPendaftaranMutasi);

//-> Web (TU)

// list yang daftar di sekolah ini (pagination)
router.post(
  `${endpoint}/v1/${topic}/list`,
  token_validation,
  only_tu,
  controller.pagination
);
// diterima pendaftaran
router.patch(
  `${endpoint}/v1/${topic}/:nisn`,
  token_validation,
  only_tu,
  controller.diterima
);
// tolak pendaftaran
router.delete(
  `${endpoint}/v1/${topic}/:nisn`,
  token_validation,
  only_tu,
  controller.ditolak
);

//-> Mobile

// cek status pendaftaran
router.get(
  `${endpoint}/v1/${topic}/status/:nisn`,
  controller.statusPendaftaran
);

// ==================================================================================

module.exports = router;
