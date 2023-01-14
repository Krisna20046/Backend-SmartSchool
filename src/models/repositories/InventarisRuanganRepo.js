const Model = require("../../utils/models.js");

const InventarisRuangan = require("../entities/InventarisRuanganEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(InventarisRuangan, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(InventarisRuangan);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(InventarisRuangan, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(InventarisRuangan, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(InventarisRuangan, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(InventarisRuangan, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(InventarisRuangan, { id });
};
