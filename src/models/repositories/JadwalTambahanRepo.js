const Model = require("../../utils/models.js");

const JadwalTambahan = require("../entities/JadwalTambahanEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(JadwalTambahan, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(JadwalTambahan);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(JadwalTambahan, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(JadwalTambahan, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(JadwalTambahan, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(JadwalTambahan, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(JadwalTambahan, { id });
};
