const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "anggota-osis";

// ==================================================================================

const controller = require("../controllers/AnggotaOsisController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah-anggota`, controller.tambahAnggota);
router.post(`${endpoint}/v1/${topic}`, controller.showPagination);

// router.get(`${endpoint}/v1/${topic}`, controller.show);
// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
