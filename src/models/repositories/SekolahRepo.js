const Model = require("../../utils/models.js");

const Sekolah = require("../entities/SekolahEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Sekolah, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Sekolah);
};
exports.getAllOrigin = async () => {
  return await Model.customQuery("SELECT * FROM sekolah");
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Sekolah, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Sekolah, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Sekolah, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Sekolah, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Sekolah, { id });
};
