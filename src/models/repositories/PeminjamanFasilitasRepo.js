const Model = require("../../utils/models.js");

const PeminjamanFasilitas = require("../entities/PeminjamanFasilitasEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(PeminjamanFasilitas, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(PeminjamanFasilitas);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(PeminjamanFasilitas, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(PeminjamanFasilitas, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(PeminjamanFasilitas, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(PeminjamanFasilitas, { id }, new_data);
};
exports.updateWhereId = async (id, new_data) => {
  return await Model.updateFrom(PeminjamanFasilitas, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(PeminjamanFasilitas, { id });
};
