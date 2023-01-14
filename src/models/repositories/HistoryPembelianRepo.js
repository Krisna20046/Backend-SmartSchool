const Model = require("../../utils/models.js");

const HistoryPembelianEntity = require("../entities/HistoryPembelianEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(HistoryPembelianEntity, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(HistoryPembelianEntity);
};
exports.showPagination = async (show, page, keyword = "", desc = false) => {
  return await Model.paginationFrom(HistoryPembelianEntity, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(HistoryPembelianEntity, "id", array_id);
};
exports.collectByPembelianIds = async (array_id) => {
  return await Model.in(HistoryPembelianEntity, "id_pembelian", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(HistoryPembelianEntity, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(HistoryPembelianEntity, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(HistoryPembelianEntity, { id });
};
