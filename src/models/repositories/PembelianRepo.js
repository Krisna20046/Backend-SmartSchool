const Model = require("../../utils/models.js");

const PembelianEntity = require("../entities/PembelianEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(PembelianEntity, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(PembelianEntity);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(PembelianEntity, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(PembelianEntity, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(PembelianEntity, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(PembelianEntity, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(PembelianEntity, { id });
};
