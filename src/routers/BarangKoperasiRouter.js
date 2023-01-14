const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "barang-koperasi";

// ==================================================================================

const controller = require("../controllers/BarangKoperasiController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_guru");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/tambah-barang`,
  token_validation,
  controller.insert
);

router.post(
  `${endpoint}/v1/${topic}`,
  token_validation,
  controller.showPagination
);

router.put(`${endpoint}/v1/${topic}/edit-barang`, 
token_validation, 
controller.update
);

router.delete(
  `${endpoint}/v1/${topic}/:nama`,
  token_validation,
  only_tu,
  controller.deleteBarangKoperasi
);

// ==================================================================================

module.exports = router;
