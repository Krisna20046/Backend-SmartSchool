const Model = require("../../utils/models.js");

const Kelas = require("../entities/KelasEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Kelas, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Kelas);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Kelas, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Kelas, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Kelas, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(Kelas, { id }, new_data);
};
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(Kelas, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(Kelas, { id });
};
