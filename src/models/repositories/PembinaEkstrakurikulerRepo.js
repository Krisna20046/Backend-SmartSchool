const Model = require("../../utils/models.js");

const PembinaEkstrakurikuler = require("../entities/PembinaEkstrakurikulerEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(PembinaEkstrakurikuler, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(PembinaEkstrakurikuler);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(PembinaEkstrakurikuler, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(PembinaEkstrakurikuler, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(PembinaEkstrakurikuler, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(PembinaEkstrakurikuler, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(PembinaEkstrakurikuler, { id });
};
