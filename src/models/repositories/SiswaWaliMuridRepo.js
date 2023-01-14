const Model = require("../../utils/models.js");

const SiswaWaliMurid = require("../entities/SiswaWaliMuridEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(SiswaWaliMurid, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(SiswaWaliMurid);
};
exports.collectByIds = async (array_id) => {
  return await Model.in(SiswaWaliMurid, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(SiswaWaliMurid, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(SiswaWaliMurid, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(SiswaWaliMurid, { id });
};
