const blogpost = require('../services/blogpost');
const { CREATED } = require('../schemas/statusCodes');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const postData = await blogpost.createPost({ title, content, categoryIds, id });
  if (postData.err) {
    const { statusCode, message } = postData.err;
    return res.status(statusCode).json({ message });
  }
  return res.status(CREATED).json(postData);
};

module.exports = {
  createPost,
};