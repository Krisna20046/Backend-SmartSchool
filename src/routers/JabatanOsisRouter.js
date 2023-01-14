const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "jabatan-osis";

// ==================================================================================

const controller = require("../controllers/JabatanOsisController");

const token_validation = require("../middlewares/token_validation");
const only_osis = require("../middlewares/only_osis");
// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`,
    token_validation,
    controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    controller.show
);

// router.put(`${endpoint}/v1/${topic}`, controller.update);

router.delete(`${endpoint}/v1/${topic}/:nama`,
    token_validation,
    controller.delete
);

// ==================================================================================

module.exports = router;
