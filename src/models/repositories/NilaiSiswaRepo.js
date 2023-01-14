const Model = require("../../utils/models.js");

const NilaiSiswa = require("../entities/NilaiSiswaEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(NilaiSiswa, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(NilaiSiswa);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(NilaiSiswa, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(NilaiSiswa, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(NilaiSiswa, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(NilaiSiswa, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(NilaiSiswa, { id });
};
