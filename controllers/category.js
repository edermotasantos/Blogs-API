const category = require('../services/category');
const { tryAgainLater } = require('../schemas/messages');

const { CREATED, INTERNAL_SERVER_ERROR } = require('../schemas/statusCodes');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryCreated = await category.createCategory({ name });
    if (categoryCreated.err) {
      const { statusCode, message } = categoryCreated.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(CREATED).json(categoryCreated);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

module.exports = {
  createCategory,
};
