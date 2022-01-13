const blogPost = require('../services/blogpost');
const { CREATED, INTERNAL_SERVER_ERROR, OK } = require('../schemas/statusCodes');
const { tryAgainLater } = require('../schemas/messages');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const postData = await blogPost.createPost({ title, content, categoryIds, id });
  if (postData.err) {
    const { statusCode, message } = postData.err;
    return res.status(statusCode).json({ message });
  }
  return res.status(CREATED).json(postData);
};

const listAllPosts = async (req, res) => {
  try {
    const allPostsFound = await blogPost.listAllPosts();
    return res.status(OK).json(allPostsFound);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

module.exports = {
  createPost,
  listAllPosts,
};