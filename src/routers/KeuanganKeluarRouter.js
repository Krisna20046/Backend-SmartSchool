const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "keuangan-keluar";

// ==================================================================================

const controller = require("../controllers/KeuanganKeluarController");

const token_validation = require("../middlewares/token_validation");

// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`,
    token_validation,
    controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    controller.show
);

router.put(`${endpoint}/v1/${topic}/edit`,
    token_validation,
    controller.update
);

router.delete(`${endpoint}/v1/${topic}/:ambil_dana`,
    token_validation,
    controller.deleteKeuanganKeluar

);

// ==================================================================================

module.exports = router;
