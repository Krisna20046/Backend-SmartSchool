const Model = require("../../utils/models.js");

const Inventaris = require("../entities/InventarisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Inventaris, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Inventaris);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Inventaris, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Inventaris, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Inventaris, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Inventaris, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Inventaris, { id });
};
