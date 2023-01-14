const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "tabungan-masuk-siswa";

// ==================================================================================

const controller = require("../controllers/TabunganMasukSiswaController");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`, 
controller.insert
);

router.post(`${endpoint}/v1/${topic}`, 
controller.show
);

router.put(`${endpoint}/v1/${topic}/edit`, 
controller.update
);

router.delete(`${endpoint}/v1/${topic}/:id_siswa`, 
controller.deleteTabunganMasuk
);

// ==================================================================================

module.exports = router;
