const Model = require("../../utils/models.js");

const ApkVersion = require("../entities/ApkVersionEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(ApkVersion, new_data);
};

// Read
exports.latestApp = async (select = "version") => {
  const list = await Model.selectFrom(ApkVersion);
  return list.reverse()[0][select];
};
exports.showAll = async () => {
  return await Model.selectFrom(ApkVersion);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(ApkVersion, selector);
};
exports.isVersionExist = async (version) => {
  return await this.isExist({
    version,
  });
};

// Delete
exports.deleteWhereVersion = async (version) => {
  return await Model.deleteFrom(ApkVersion, { version });
};
