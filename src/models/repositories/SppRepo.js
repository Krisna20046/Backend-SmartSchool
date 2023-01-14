const Model = require("../../utils/models.js");

const Spp = require("../entities/SppEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Spp, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Spp);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Spp, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Spp, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Spp, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Spp, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Spp, { id });
};
