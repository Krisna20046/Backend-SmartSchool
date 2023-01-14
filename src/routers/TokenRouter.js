const router = require("express").Router();
const { endpoint } = require("../config");

const topic = "token";

// ==================================================================================

const controller = require("../controllers/TokenController");

// ==================================================================================

router.get(
  `${endpoint}/v1/${topic}/refresh`, // public (token)
  controller.refresh
);

router.get(
  `${endpoint}/v1/${topic}/validate`, // public (token)
  controller.validate
);

// for debug (Danger!, comment if not use)
// router.get(
//   `${endpoint}/v1/${topic}/unlimited`, // public (token)
//   controller.unlimited
// );

// ==================================================================================

module.exports = router;
