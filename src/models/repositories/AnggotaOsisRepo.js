const Model = require("../../utils/models.js");

const AnggotaOsis = require("../entities/AnggotaOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(AnggotaOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(AnggotaOsis);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(AnggotaOsis, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(AnggotaOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(AnggotaOsis, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(AnggotaOsis, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(AnggotaOsis, { id });
};
