const Model = require("../../utils/models.js");

const BlogOsis = require("../entities/BlogOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(BlogOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(BlogOsis);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(BlogOsis, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(BlogOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(BlogOsis, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};
exports.isPrefixExist = async (prefix) => {
  return await this.isExist({
    prefix,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(BlogOsis, { id }, new_data);
};

// Delete
exports.deleteWherePrefix = async (prefix) => {
  return await Model.deleteFrom(BlogOsis, { prefix });
};
