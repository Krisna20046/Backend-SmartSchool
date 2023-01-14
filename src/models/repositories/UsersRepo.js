const Model = require("../../utils/models.js");

const Users = require("../entities/UsersEntity");

const { default_password, role_user } = require("../../consts");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Users, new_data);
};

// Read
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Users, {
    show,
    page,
    keywords: {
      name: keyword,
      role: role_user.murid,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Users, "id", array_id);
};

exports.showDetail = async (id) => {
  const result = await Model.selectFrom(Users, { id });
  if (result.length > 0) {
    return result[0];
  }
  return false;
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Users, selector);
};
exports.isLogin = async (username, password) => {
  return await this.isExist({ username, password });
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isUserNameExist = async (username) => {
  return await this.isExist({
    username,
  });
};
exports.isPhoneNumberExist = async (no_hp) => {
  return await this.isExist({
    no_hp,
  });
};
exports.isEmailExist = async (email) => {
  return await this.isExist({
    email,
  });
};
exports.isAlumni = async (username) => {
  const result = await this.isExist({ username });
  return result ? result.is_alumni : false;
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Users, { id }, new_data);
};
exports.updateWhereUserName = async (username, new_data) => {
  return await Model.updateFrom(Users, { username }, new_data);
};
exports.resetPassword = async (username) => {
  return await Model.updateFrom(
    Users,
    { username },
    { password: default_password }
  );
};

// Non Active User
exports.blockWhereId = async (id) => {
  return await Model.updateFrom(Users, { id }, { is_blocked: true });
};
exports.unBlockWhereId = async (id) => {
  return await Model.updateFrom(Users, { id }, { is_blocked: false });
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Users, { id });
};
exports.deleteWhereEmail = async (email) => {
  return await Model.deleteFrom(Users, { email });
};

// Manage Basic User to Admin
exports.setAdminWhereId = async (id) => {
  return await Model.updateFrom(Users, { id }, { is_admin: true });
};
exports.unsetAdminWhereId = async (id) => {
  return await Model.updateFrom(Users, { id }, { is_admin: false });
};
