const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "kelas";

// ==================================================================================

const controller = require("../controllers/KelasController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");
// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`,
    token_validation,
    only_tu,
    controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    only_tu,
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
    controller.deleteKelas
);

// ==================================================================================

module.exports = router;
