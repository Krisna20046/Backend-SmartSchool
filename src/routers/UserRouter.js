const router = require("express").Router();
const { endpoint } = require("../config");

// ==================================================================================

const controller = require("../controllers/UserController");

const token_validation = require("../middlewares/token_validation");
const only_admin = require("../middlewares/only_admin");
const only_superman = require("../middlewares/only_superman");

// ==================================================================================
// Public

// Read
router.get(
  endpoint + "/v1/user/profile",
  token_validation,
  controller.showProfile
); // get init information user

// Update
router.put(endpoint + "/v1/user/edit", token_validation, controller.updateUser); // edit information user

// ==================================================================================
// Admin

// Create
router.post(
  endpoint + "/v1/user/manage",
  token_validation,
  only_admin,
  controller.createUserFromAdmin
);

// Read
router.post(
  endpoint + "/v1/user/show",
  token_validation,
  only_admin,
  controller.readUserPagination
);

// Update
router.put(
  endpoint + "/v1/user/manage",
  token_validation,
  only_admin,
  controller.updateUserFromAdmin
);

// Delete
router.delete(
  endpoint + "/v1/user/manage/:id",
  token_validation,
  only_admin,
  controller.deleteUser
);

// Non Active User
router.delete(
  endpoint + "/v1/user/block",
  token_validation,
  only_admin,
  controller.blockUser
);
router.patch(
  endpoint + "/v1/user/unblock",
  token_validation,
  only_admin,
  controller.unBlockUser
);

// Manage Basic User to Admin
router.patch(
  endpoint + "/v1/user/set/admin/:id",
  token_validation,
  only_superman,
  controller.setAdmin
);
router.delete(
  endpoint + "/v1/user/unset/admin/:id",
  token_validation,
  only_superman,
  controller.unsetAdmin
);

// ==================================================================================

module.exports = router;
