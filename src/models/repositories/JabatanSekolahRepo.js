const Model = require("../../utils/models.js");

const JabatanSekolah = require("../entities/JabatanSekolahEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(JabatanSekolah, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(JabatanSekolah);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(JabatanSekolah, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(JabatanSekolah, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(JabatanSekolah, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isNamaExist = async (nama) => {
  return await this.isExist({
    nama,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(JabatanSekolah, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(JabatanSekolah, { id });
};
exports.deleteWhereNama = async (nama) => {
  return await Model.deleteFrom(JabatanSekolah, { nama });
};
