const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "jadwal-pelajaran";

// ==================================================================================

const controller = require("../controllers/JadwalPelajaranController");

const token_validation = require("../middlewares/token_validation");
// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`,
    token_validation,
    controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    controller.show
);

router.put(`${endpoint}/v1/${topic}/edit`,
    token_validation,
    controller.update
);

router.delete(`${endpoint}/v1/${topic}/:id`,
    token_validation,
    controller.deleteJadwalPelajaran
);

// ==================================================================================

module.exports = router;
