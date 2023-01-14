const Model = require("../../utils/models.js");

const SiswaKelas = require("../entities/SiswaKelasEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(SiswaKelas, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(SiswaKelas);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(SiswaKelas, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(SiswaKelas, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(SiswaKelas, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(SiswaKelas, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(SiswaKelas, { id });
};
