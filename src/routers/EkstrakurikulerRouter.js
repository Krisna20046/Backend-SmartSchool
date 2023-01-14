const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "ekstrakurikuler";

// ==================================================================================

const controller = require("../controllers/EkstrakurikulerController");
const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");
const { on } = require("nodemon");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/tambah`,
  token_validation,
  only_tu,
  controller.insert
);
router.post(`${endpoint}/v1/${topic}`, 
token_validation,
only_tu,
controller.ShowPagination
);

 router.put(`${endpoint}/v1/${topic}/edit`, 
 token_validation,
 only_tu,
 controller.editEktrakurikuler
 );
 
 router.delete(
   `${endpoint}/v1/${topic}/:id`,
   token_validation,
   only_tu,
   controller.deleteEkstrakurikuler
 );

// ==================================================================================

module.exports = router;
