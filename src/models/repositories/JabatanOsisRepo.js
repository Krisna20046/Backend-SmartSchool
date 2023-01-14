const Model = require("../../utils/models.js");

const JabatanOsis = require("../entities/JabatanOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(JabatanOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(JabatanOsis);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(JabatanOsis, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(JabatanOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(JabatanOsis, selector);
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
  return await Model.updateFrom(JabatanOsis, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(JabatanOsis, { id });
};
exports.deleteWhereNama = async (nama) => {
  return await Model.deleteFrom(JabatanOsis, { nama });
};
