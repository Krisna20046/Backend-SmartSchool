const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "perpustakaan-buku";

// ==================================================================================

const controller = require("../controllers/PerpustakaanBukuController");

const token_validation = require("../middlewares/token_validation");
const only_tu = require("../middlewares/only_tu");
// ==================================================================================

router.post(`${endpoint}/v1/${topic}/tambah`,
    token_validation,
    only_tu,
    controller.insert
);

router.post(`${endpoint}/v1/${topic}`,
    token_validation,
    only_tu,
    controller.show
);

router.put(`${endpoint}/v1/${topic}/edit`,
    token_validation,
    only_tu,
    controller.update
);

router.delete(`${endpoint}/v1/${topic}/:judul`,
    token_validation,
    only_tu,
    controller.deleteBukuPerpustakaan
);

// ==================================================================================

module.exports = router;
