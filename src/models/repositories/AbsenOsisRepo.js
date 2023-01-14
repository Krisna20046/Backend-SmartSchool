const Model = require("../../utils/models.js");

const AbsenOsis = require("../entities/AbsenOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(AbsenOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(AbsenOsis);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(AbsenOsis, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(AbsenOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(AbsenOsis, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(AbsenOsis, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(AbsenOsis, { id });
};
