const Model = require("../../utils/models.js");

const GuruMapel = require("../entities/GuruMapelEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(GuruMapel, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(GuruMapel);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(GuruMapel, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(GuruMapel, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(GuruMapel, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(GuruMapel, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(GuruMapel, { id });
};
