require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UNAUTHORIZED } = require('../schemas/statusCodes');
const { tokenNotFound, invalidToken } = require('../schemas/messages');

const jwtSecret = process.env.JWT_SECRET || 'secret';

/**
 * Consultei o repositório do Nikolas Silva para resolver essa parte.
 * Link do repositório https://github.com/tryber/sd-011-project-blogs-api/pull/9/files
 */

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: tokenNotFound });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { email } = decoded.data;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: invalidToken });
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: invalidToken });
  }
};

module.exports = {
  validateToken,
};
