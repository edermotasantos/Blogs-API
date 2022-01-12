const { BAD_REQUEST, CONFLICT, UNAUTHORIZED } = require('./statusCodes');

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
  401: {
    tokenNotFound: 'Token not found',
    invalidToken: 'Expired or invalid token',
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
    emailEmpty,
    passwordEmpty,
    invalidFields,
  } = messages[BAD_REQUEST];
  
  const { userAlreadyExists } = messages[CONFLICT];

  const { tokenNotFound, invalidToken } = messages[UNAUTHORIZED];

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
};  
