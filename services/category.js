const { Category } = require('../models');
const { nameIsRequired } = require('../schemas/messages');

const { BAD_REQUEST } = require('../schemas/statusCodes');

const validateCategoryName = (name) => {
  if (!name) return { err: { statusCode: BAD_REQUEST, message: nameIsRequired } };
};

const createCategory = async ({ name }) => {
  const validateName = validateCategoryName(name);
  if (validateName) return validateName;
  const categoryCreated = await Category.create({ name });
  return categoryCreated;
};

module.exports = {
  createCategory,
};
