const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "auth";

// ==================================================================================

const controller = require("../controllers/AuthController");

const token_validation = require("../middlewares/token_validation");
const only_admin = require("../middlewares/only_admin");
const only_superman = require("../middlewares/only_superman");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/login`, controller.login);
router.get(`${endpoint}/v1/${topic}/reset/:username`, controller.reset);

// ==================================================================================

module.exports = router;
