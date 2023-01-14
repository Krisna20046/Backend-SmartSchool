const Model = require("../../utils/models.js");

const PerpustakaanBuku = require("../entities/PerpustakaanBukuEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(PerpustakaanBuku, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(PerpustakaanBuku);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(PerpustakaanBuku, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(PerpustakaanBuku, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(PerpustakaanBuku, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isJudulExist = async (judul) => {
  return await this.isExist({
    judul,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(PerpustakaanBuku, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(PerpustakaanBuku, { id });
};
exports.deleteWhereJudul = async (judul) => {
  return await Model.deleteFrom(PerpustakaanBuku, { judul });
};
