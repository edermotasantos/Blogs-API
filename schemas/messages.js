const {
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('./statusCodes');

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
    nameIsRequired: '"name" is required',
    titleIsRequired: '"title" is required',
    contentIsRequired: '"content" is required',
    categoryIdsIsRequired: '"categoryIds" is required',
    categoryIdsNotFound: '"categoryIds" not found',
    categoriesCantBeEdited: 'Categories cannot be edited',
  },
  401: {
    tokenNotFound: 'Token not found',
    invalidToken: 'Expired or invalid token',
    unauthorizedUser: 'Unauthorized user',
  },
  404: {
    userDoesntExist: 'User does not exist',
    postDoesntExist: 'Post does not exist',
  },  
  409: {
    userAlreadyExists: 'User already registered',
  },
  500: {
    tryAgainLater: 'Something went wrong. Try again later',
  },
};

const {
    nameLength,
    passwordLength,
    emailIsRequired,
    passwordIsRequired,
    displayNameIsRequired,
    invalidEmail,
    emailEmpty,
    passwordEmpty,
    invalidFields,
    nameIsRequired,
    titleIsRequired,
    contentIsRequired,
    categoryIdsIsRequired,
    categoryIdsNotFound,
    categoriesCantBeEdited,
} = messages[BAD_REQUEST];

  const { userDoesntExist, postDoesntExist } = messages[NOT_FOUND];
  
  const { userAlreadyExists } = messages[CONFLICT];

  const { tokenNotFound, invalidToken, unauthorizedUser } = messages[UNAUTHORIZED];

  const { tryAgainLater } = messages[INTERNAL_SERVER_ERROR];

module.exports = {
  nameLength,
  passwordLength,
  emailIsRequired,
  passwordIsRequired,
  displayNameIsRequired,
  invalidEmail,
  emailEmpty,
  passwordEmpty,
  invalidFields,
  userAlreadyExists,
  tokenNotFound,
  invalidToken,
  userDoesntExist,
  tryAgainLater,
  nameIsRequired,
  titleIsRequired,
  contentIsRequired,
  categoryIdsIsRequired,
  categoryIdsNotFound,
  postDoesntExist,
  categoriesCantBeEdited,
  unauthorizedUser,
};  
