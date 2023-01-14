const Model = require("../../utils/models.js");

const Dokumen = require("../entities/DokumenEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Dokumen, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Dokumen);
};
exports.showDokumenWhereUserIdBaru = async (id_user_baru) => {
  return await Model.selectFrom(Dokumen, { id_user_baru });
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Dokumen, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Dokumen, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Dokumen, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.switchWhereUserId = async (id_user_baru, id_user) => {
  return await Model.updateFrom(Dokumen, { id_user_baru }, { id_user });
};

// Delete
exports.deleteWhereSiswaBaruId = async (id_user_baru) => {
  return await Model.deleteFrom(Dokumen, { id_user_baru });
};
