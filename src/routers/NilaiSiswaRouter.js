const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "nilai";

// ==================================================================================

const controller = require("../controllers/NilaiSiswaController");
const token_validation = require("../middlewares/token_validation");
const only_guru = require("../middlewares/only_guru");
// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/tambah`,
  token_validation,
  only_guru,
  controller.formtambahNilai
);
router.post(`${endpoint}/v1/${topic}`, controller.Pagination);

router.put(`${endpoint}/v1/${topic}/edit`, controller.formupdateNilai);
router.delete(`${endpoint}/v1/${topic}/:id`, controller.hapusNilai);

// ==================================================================================

module.exports = router;
