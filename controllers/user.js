const user = require('../services/user');

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

module.exports = {
  createUser,
};
