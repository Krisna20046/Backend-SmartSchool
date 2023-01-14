const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "item-fasilitas";

// ==================================================================================

const controller = require("../controllers/ItemFasilitasController");

const token_validation = require("../middlewares/token_validation");

// ==================================================================================

router.post(
  `${endpoint}/v1/${topic}/tambah`,
  token_validation,
  controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
  controller.show
);

router.put(`${endpoint}/v1/${topic}/edit`,
  token_validation,
  controller.update
);

router.delete(`${endpoint}/v1/${topic}/:nama`,
  token_validation,
  controller.deleteItemFasilitas
);

// ==================================================================================

module.exports = router;
