const jwt = require('jsonwebtoken');
const { User } = require('../models');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const messages = {
  400: {
    nameLength: '"displayName" length must be at least 8 characters long',
    passwordLength: '"password" length must be 6 characters long',
    emailIsRequired: '"email" is required',
    passwordIsRequired: '"password" is required',
    displayNameIsRequired: '"displayName" is required',
    invalidEmail: '"email" must be a valid email',
    emailEmpty: '"email" is not allowed to be empty',
    passwordEmpty: '"password" is not allowed to be empty',
    invalidFields: 'Invalid fields',
  },
  409: {
    userAlreadyExists: 'User already registered',
  },
};

const {
  nameLength,
  passwordLength,
  emailIsRequired,
  passwordIsRequired,
  displayNameIsRequired,
  invalidEmail,
} = messages[BAD_REQUEST];

const { userAlreadyExists } = messages[CONFLICT];

const createToken = (user, email) => {
  const jwtConfig = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };
  const { id } = user;
  const data = { id, email };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const validateNameLength = (displayName) => {
  if (displayName.length < 8) {
    return { err: { statusCode: BAD_REQUEST, message: nameLength } };
  }
};

const validatePasswordLength = (password) => {
  if (password.length !== 6) {
    return { err: { statusCode: BAD_REQUEST, message: passwordLength } };
  }
};

const validateUserData = async (email, password, displayName) => {
  if (!email) return { err: { statusCode: BAD_REQUEST, message: emailIsRequired } };
  if (!password) return { err: { statusCode: BAD_REQUEST, message: passwordIsRequired } };
  if (!displayName) return { err: { statusCode: BAD_REQUEST, message: displayNameIsRequired } };
  const validEmail = /[\w\d.+_-]+@[\w]+.com/;
  if (!validEmail.test(email)) {
    return { err: { statusCode: BAD_REQUEST, message: invalidEmail } };
  }
};

const findEmail = async (email) => {
  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) return { err: { statusCode: BAD_REQUEST, message: userAlreadyExists } };
};

/**
 * Consultei o repositório do Nikolas Silva para resolver essa parte.
 * Link do repositório https://github.com/tryber/sd-011-project-blogs-api/pull/9/files
 */

const createUser = async ({ email, password, displayName, image }) => {
  const userData = await validateUserData(email, password, displayName);
  const checkNameLength = validateNameLength(displayName);
  const checkPasswordLength = validatePasswordLength(password);
  const foundEmail = await findEmail(email);
  if (userData) return userData;
  if (checkNameLength) return checkNameLength;
  if (checkPasswordLength) return checkPasswordLength;
  if (foundEmail) return foundEmail;
  const user = await User.create({ email, password, displayName, image });
  const token = createToken(user, email);
  return { token };
};

module.exports = {
  createUser,
};
