const Model = require("../../utils/models.js");

const TabunganKeluarSiswa = require("../entities/TabunganKeluarSiswaEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(TabunganKeluarSiswa, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(TabunganKeluarSiswa);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(TabunganKeluarSiswa, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(TabunganKeluarSiswa, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(TabunganKeluarSiswa, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(TabunganKeluarSiswa, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(TabunganKeluarSiswa, { id });
};
exports.deleteWhereNisn = async (id_siswa) => {
  return await Model.deleteFrom(TabunganKeluarSiswa, { id_siswa });
};
