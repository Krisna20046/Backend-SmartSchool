const Model = require("../../utils/models.js");

const AbsenEkstrakurikuler = require("../entities/AbsenEkstrakurikulerEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(AbsenEkstrakurikuler, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(AbsenEkstrakurikuler);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(AbsenEkstrakurikuler, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(AbsenEkstrakurikuler, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(AbsenEkstrakurikuler, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(AbsenEkstrakurikuler, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(AbsenEkstrakurikuler, { id });
};
