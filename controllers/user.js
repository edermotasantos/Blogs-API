const user = require('../services/user');

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const messages = {
  500: {
    tryAgainLater: 'Something went wrong. Try again later',
  },
};

const { tryAgainLater } = messages[INTERNAL_SERVER_ERROR];

const createUser = async (req, res) => {
  try {
    const { email, password, displayName, image } = req.body;
    const userData = await user.createUser({ email, password, displayName, image });
    if (userData.err) {
      const { statusCode, message } = userData.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(CREATED).json(userData);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginData = await user.login({ email, password });
    if (loginData.err) {
      const { statusCode, message } = loginData.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(OK).json(loginData);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

module.exports = {
  createUser,
  login,
};
