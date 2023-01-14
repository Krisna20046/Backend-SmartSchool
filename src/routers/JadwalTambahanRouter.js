const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "jadwal-tambahan";

// ==================================================================================

const controller = require("../controllers/JadwalTambahanController");

const only_tu = require("../middlewares/only_tu");
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
    only_tu,
    controller.update
);

router.delete(`${endpoint}/v1/${topic}/:id`,
    token_validation,
    only_tu,
    controller.delete
);

// ==================================================================================

module.exports = router;
