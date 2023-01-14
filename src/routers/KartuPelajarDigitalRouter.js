const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "kartu-pelajar-digital";

// ==================================================================================

const controller = require("../controllers/KartuPelajarDigitalController");
const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu")
// ==================================================================================

router.get(`${endpoint}/v1/${topic}/:nisn`, controller.json);
router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    only_tu,
    controller.show
);

// ==================================================================================

module.exports = router;
