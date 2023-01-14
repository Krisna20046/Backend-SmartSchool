const Model = require("../../utils/models.js");

const JadwalKegiatanOsis = require("../entities/JadwalKegiatanOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(JadwalKegiatanOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(JadwalKegiatanOsis);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(JadwalKegiatanOsis, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(JadwalKegiatanOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(JadwalKegiatanOsis, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isPrefixExist = async (prefix) => {
  return await this.isExist({
    prefix,
  });
};


// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(JadwalKegiatanOsis, { id }, new_data);
};

// Delete
exports.deleteWherePrefix = async (prefix) => {
  return await Model.deleteFrom(JadwalKegiatanOsis, { prefix });
};
