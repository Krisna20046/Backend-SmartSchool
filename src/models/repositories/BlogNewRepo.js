const Model = require("../../utils/models.js");

const Blog = require("../entities/BlogNewEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(Blog, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(Blog);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(Blog, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(Blog, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(Blog, selector);
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
  return await Model.updateFrom(Blog, { id }, new_data);
};

// Delete
exports.deleteWherePrefix = async (prefix) => {
  return await Model.deleteFrom(Blog, { prefix });
};
