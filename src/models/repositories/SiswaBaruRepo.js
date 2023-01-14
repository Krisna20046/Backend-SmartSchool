const Model = require("../../utils/models.js");

const SiswaBaru = require("../entities/SiswaBaruEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(SiswaBaru, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(SiswaBaru);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(SiswaBaru, {
    show,
    page,
    keywords: {
      nama: keyword,
      nisn: keyword,
      no_kk: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(SiswaBaru, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(SiswaBaru, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isNisnExist = async (nisn) => {
  return await this.isExist({
    nisn,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(SiswaBaru, { id }, new_data);
};

// Delete
exports.deleteWhereNisn = async (nisn) => {
  return await Model.deleteFrom(SiswaBaru, { nisn });
};
