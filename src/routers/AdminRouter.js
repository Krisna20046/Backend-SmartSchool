const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "admin";

// ==================================================================================

const GuruController = require("../controllers/GuruController");

// ==================================================================================

//-> Guru
router.post(`${endpoint}/v1/${topic}/handle/guru`, GuruController.guruInsert);
router.post(`${endpoint}/v1/${topic}/handle/guru/show`, GuruController.guruShow);
router.put(`${endpoint}/v1/${topic}/handle/guru`, GuruController.guruUpdate);
router.delete(`${endpoint}/v1/${topic}/handle/guru`, GuruController.guruDelete);

// ==================================================================================

module.exports = router;
