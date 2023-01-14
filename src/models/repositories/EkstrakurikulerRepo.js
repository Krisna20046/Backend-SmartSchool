const Model = require("../../utils/models.js");

const Ekstrakurikuler = require("../entities/EkstrakurikulerEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Ekstrakurikuler, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Ekstrakurikuler);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Ekstrakurikuler, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Ekstrakurikuler, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Ekstrakurikuler, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Ekstrakurikuler, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Ekstrakurikuler, { id });
};
