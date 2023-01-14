const Model = require("../../utils/models.js");

const PerpustakaanPeminjaman = require("../entities/PerpustakaanPeminjamanEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(PerpustakaanPeminjaman, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(PerpustakaanPeminjaman);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(PerpustakaanPeminjaman, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(PerpustakaanPeminjaman, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(PerpustakaanPeminjaman, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(PerpustakaanPeminjaman, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(PerpustakaanPeminjaman, { id });
};
