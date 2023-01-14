const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "peminjaman-fasilitas";

// ==================================================================================

const controller = require("../controllers/PeminjamanFasilitasController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`, controller.insert);
router.post(`${endpoint}/v1/${topic}`, controller.show);

router.put(`${endpoint}/v1/${topic}/edit`, controller.update);
router.delete(`${endpoint}/v1/${topic}/:id`, controller.deletePeminjamanFasilitas);

// ==================================================================================

module.exports = router;
