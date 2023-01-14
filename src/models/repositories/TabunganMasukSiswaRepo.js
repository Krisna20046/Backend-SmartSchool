const Model = require("../../utils/models.js");

const TabunganMasukSiswa = require("../entities/TabunganMasukSiswaEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(TabunganMasukSiswa, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(TabunganMasukSiswa);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(TabunganMasukSiswa, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(TabunganMasukSiswa, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(TabunganMasukSiswa, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isNisnExist = async (id_siswa) => {
  return await this.isExist({
    id_siswa,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(TabunganMasukSiswa, { id }, new_data);
};
exports.updateWhereNisn = async (nisn, new_data) => {
  return await Model.updateFrom(TabunganMasukSiswa, { nisn }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(TabunganMasukSiswa, { id });
};
exports.deleteWhereNisn = async (id_siswa) => {
  return await Model.deleteFrom(TabunganMasukSiswa, { id_siswa });
};