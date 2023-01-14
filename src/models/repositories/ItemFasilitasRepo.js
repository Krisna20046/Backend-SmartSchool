const Model = require("../../utils/models.js");

const ItemFasilitas = require("../entities/ItemFasilitasEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(ItemFasilitas, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(ItemFasilitas);
};
exports.showPagination = async (show, page, keyword="", desc = false) => {
  return await Model.paginationFrom(ItemFasilitas, {
    show,
    page,
    // keywords: {
    //   name: keyword,
    // },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(ItemFasilitas, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(ItemFasilitas, selector);
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
  return await Model.updateFrom(ItemFasilitas, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(ItemFasilitas, { id });
};
exports.deleteWhereNama = async (nama) => {
  return await Model.deleteFrom(ItemFasilitas, { nama });
};

