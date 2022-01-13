const { Category, BlogPost } = require('../models');
const {
  titleIsRequired,
  contentIsRequired,
  categoryIdsIsRequired,
  categoryIdsNotFound,
} = require('../schemas/messages');
const { BAD_REQUEST } = require('../schemas/statusCodes');

const ValidatePostData = (title, content) => {
  if (!title) return { err: { code: BAD_REQUEST, message: titleIsRequired } };
  if (!content) return { err: { code: BAD_REQUEST, message: contentIsRequired } };
};

const createPost = async ({ title, content, categoryIds, id }) => {
  const postData = ValidatePostData(title, content);
  if (postData) return postData;
  if (!categoryIds) return { err: { code: BAD_REQUEST, message: categoryIdsIsRequired } };
  const allPostsFoundByCategory = await Category.findAll({ where: { id: categoryIds } });
  if (allPostsFoundByCategory.length !== categoryIds.length) {
    return { err: { code: BAD_REQUEST, message: categoryIdsNotFound } };
  }
  const postCreated = await BlogPost.create({ title, content, userId: id });
  const postFound = await BlogPost.findByPk(postCreated.dataValues.id, {
    attributes: { exclude: ['published', 'updated'] },
  });
  await postFound.addCategory(allPostsFoundByCategory);
  return postFound;
};

module.exports = {
  createPost,
};
