const UserService = require("../services/UserService");

// ==================================================================================

//-> Create

exports.createUserRegister = async (req, res) => {
  const { code, message, render } = await UserService.insert(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.createUserFromAdmin = async (req, res) => {
  const { code, message, render } = await UserService.insertByAdmin(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Read

exports.readUserPagination = async (req, res) => {
  const { code, message, render } = await UserService.pagination(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.readUserIds = async (req, res) => {
  const { code, message, render } = await UserService.ids(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.readUserDetail = async (req, res) => {
  const { code, message, render } = await UserService.detail(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.showProfile = async (req, res) => {
  const { id } = req.user;
  const { code, message, render } = await UserService.profile(req.traceId, id);
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Validation

exports.validationPhoneNumber = async (req, res) => {
  const { code, message, render } = await UserService.validation(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.validationLogin = async (req, res) => {
  const { code, message, render } = await UserService.validationLogin(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Update

exports.updateUserOtp = async (req, res) => {
  const { code, message, render } = await UserService.updateOtp(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.updateUserFromAdmin = async (req, res) => {
  const { code, message, render } = await UserService.updateAdmin(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.user;
  const { code, message, render } = await UserService.update(
    req.traceId,
    id,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Delete

exports.deleteUser = async (req, res) => {
  const { code, message, render } = await UserService.delete(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Non Active User

exports.blockUser = async (req, res) => {
  const { code, message, render } = await UserService.block(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
exports.unBlockUser = async (req, res) => {
  const { code, message, render } = await UserService.unblock(
    req.traceId,
    req.body
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

//-> Manage Basic User to Admin

exports.setAdmin = async (req, res) => {
  const { code, message, render } = await UserService.setAdmin(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};

exports.unsetAdmin = async (req, res) => {
  const { code, message, render } = await UserService.unsetAdmin(
    req.traceId,
    req.params
  );
  if (render) {
    return res.status(code).json(render);
  }
  return res.status(code).json({
    message,
  });
};
