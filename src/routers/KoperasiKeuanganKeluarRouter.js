const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "koperasi-keuangan-keluar";

// ==================================================================================

const controller = require("../controllers/KoperasiKeuanganKeluarController");

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

router.delete(`${endpoint}/v1/${topic}/:id`,
    controller.deleteKoperasiKeuanganKeluar
);

// ==================================================================================

module.exports = router;
