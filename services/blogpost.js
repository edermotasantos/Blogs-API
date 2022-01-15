const { User, Category, BlogPost } = require('../models');
const {
  titleIsRequired,
  contentIsRequired,
  categoryIdsIsRequired,
  categoryIdsNotFound,
  categoriesCantBeEdited,
  unauthorizedUser,
} = require('../schemas/messages');
const { BAD_REQUEST, UNAUTHORIZED } = require('../schemas/statusCodes');

const ValidatePostData = (title, content) => {
  if (!title) return { err: { statusCode: BAD_REQUEST, message: titleIsRequired } };
  if (!content) return { err: { statusCode: BAD_REQUEST, message: contentIsRequired } };
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

const listAllPosts = async () => {
  const allPostFound = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  return allPostFound;
};

const listPostById = async (id) => {
  const postFoundById = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
      ],
  });
  return postFoundById;
};

const updatePostById = async ({ id, title, content, categoryIds, email }) => {
  const postFound = await BlogPost.findOne({ where: { id }, include: [{ all: true }] });
  if (categoryIds) {
    return { err: { statusCode: BAD_REQUEST, message: categoriesCantBeEdited } };
  }
  if (postFound.dataValues.user.email !== email) {
    // console.log(`unauthorizedUser ${unauthorizedUser}`);
    return { err: { statusCode: UNAUTHORIZED, message: unauthorizedUser } };
  }
  const postFoundById = await postFound.update({ title, content }, { where: { id } });
  return postFoundById;
};

module.exports = {
  createPost,
  listAllPosts,
  listPostById,
  updatePostById,
};
