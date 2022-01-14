const blogPost = require('../services/blogpost');
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../schemas/statusCodes');

const {
  tryAgainLater,
  postDoesntExist,
  titleIsRequired,
  contentIsRequired,
} = require('../schemas/messages');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const postData = await blogPost.createPost({ title, content, categoryIds, id });
    if (postData.err) {
      const { statusCode, message } = postData.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(CREATED).json(postData);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listAllPosts = async (req, res) => {
  try {
    const allPostsFound = await blogPost.listAllPosts();
    return res.status(OK).json(allPostsFound);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postFoundById = await blogPost.listPostsById(id);
    if (!postFoundById) return res.status(NOT_FOUND).json({ message: postDoesntExist });
    return res.status(OK).json(postFoundById);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const updatePostById = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.params;
  const { email } = req.user;
  const postFoundById = await blogPost.updatePostById(
    { id, title, content, categoryIds, email },
  );
  if (!title) return res.status(BAD_REQUEST).json({ message: titleIsRequired });
  if (!content) return res.status(BAD_REQUEST).json({ message: contentIsRequired });
  if (postFoundById.err) {
    const { statusCode, message } = postFoundById.err;
    return res.status(statusCode).json(message);
  }
  return res.status(OK).json(postFoundById);
};

module.exports = {
  createPost,
  listAllPosts,
  listPostById,
  updatePostById,
};