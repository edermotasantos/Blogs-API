const router = require('express').Router();
const { createUser, listAllUsers, listUserById } = require('../controllers/user');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', createUser);
router.get('/', validateToken, listAllUsers);
router.get('/:id', validateToken, listUserById);

module.exports = router;
