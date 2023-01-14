const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "template";

// ==================================================================================

const controller = require("../utils/example");

// ==================================================================================

/**
get (params) (show data)
post (params, body) (insert data)
put (params, body) (update data)
patch (params, body) (switching, merubah variabel kecil)
delete (params) (menghapus data)
 */

router.post(`${endpoint}/v1/${topic}`, controller);
router.get(`${endpoint}/v1/${topic}`, controller);
router.put(`${endpoint}/v1/${topic}`, controller);
router.delete(`${endpoint}/v1/${topic}`, controller);

// ==================================================================================

module.exports = router;
