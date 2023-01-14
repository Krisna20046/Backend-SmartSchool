const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "pembelian";

// ==================================================================================

const controller = require("../controllers/PembelianController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`, controller.insert);
router.post(`${endpoint}/v1/${topic}`, controller.show);

// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
