const Model = require("../../utils/models.js");

const BlogImageOsis = require("../entities/BlogImageOsisEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(BlogImageOsis, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(BlogImageOsis);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(BlogImageOsis, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(BlogImageOsis, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(BlogImageOsis, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(BlogImageOsis, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(BlogImageOsis, { id });
};
