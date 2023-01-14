const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "spp";

// ==================================================================================

const controller = require("../controllers/SppController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}`, controller.insert);
router.get(`${endpoint}/v1/${topic}`, controller.show);

// router.put(`${endpoint}/v1/${topic}`, controller.update);
// router.delete(`${endpoint}/v1/${topic}`, controller.delete);

// ==================================================================================

module.exports = router;
