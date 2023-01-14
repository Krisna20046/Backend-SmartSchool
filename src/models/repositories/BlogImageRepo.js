const Model = require("../../utils/models.js");

const BlogImage = require("../entities/BlogImageEntity");

// =============================================================

// Create
exports.insertNew = async (new_data) => {
  return await Model.inputFromGetId(BlogImage, new_data);
};

// Read
exports.showAll = async () => {
  return await Model.selectFrom(BlogImage);
};
exports.showPagination = async (show, page, keyword, desc = false) => {
  return await Model.paginationFrom(BlogImage, {
    show,
    page,
    keywords: {
      name: keyword,
    },
    desc,
  });
};
exports.collectByIds = async (array_id) => {
  return await Model.in(BlogImage, "id", array_id);
};

// Validation
exports.isExist = async (selector) => {
  return await Model.isExist(BlogImage, selector);
};
exports.isIdExist = async (id) => {
  return await this.isExist({
    id,
  });
};

// Update
exports.updateWhereUserId = async (id, new_data) => {
  return await Model.updateFrom(BlogImage, { id }, new_data);
};

// Delete
exports.deleteWhereId = async (id) => {
  return await Model.deleteFrom(BlogImage, { id });
};
