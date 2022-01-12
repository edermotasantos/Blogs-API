const user = require('../services/user');

const { tryAgainLater } = require('../schemas/messages');

const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('../schemas/statusCodes');

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
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listAllUsers = async (req, res) => {
  try {
      const foundUsers = await user.listAllUsers();
      return res.status(OK).json(foundUsers);
  } catch (err) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUserById = await user.listUserById(id);
    if (foundUserById.err) {
      const { statusCode, message } = foundUserById.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(OK).json(foundUserById);
  } catch (err) {
      res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

module.exports = {
  createUser,
  login,
  listAllUsers,
  listUserById,
};
