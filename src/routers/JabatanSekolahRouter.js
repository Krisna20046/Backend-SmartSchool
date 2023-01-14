const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "jabatan-sekolah";

// ==================================================================================

const controller = require("../controllers/JabatanSekolahController");

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

// router.put(`${endpoint}/v1/${topic}`, controller.update);

router.delete(`${endpoint}/v1/${topic}/:nama`,
    token_validation,
    only_tu,
    controller.deleteJabatanSekolah
);

// ==================================================================================

module.exports = router;
