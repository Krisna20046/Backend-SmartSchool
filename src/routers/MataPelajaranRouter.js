const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "mata-pelajaran";

// ==================================================================================

const controller = require("../controllers/MataPelajaranController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`, controller.insert);
router.post(`${endpoint}/v1/${topic}`, controller.show);

// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
