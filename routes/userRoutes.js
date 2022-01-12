const router = require('express').Router();
const { createUser, listAllUsers } = require('../controllers/user');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', createUser);
router.get('/', validateToken, listAllUsers);

module.exports = router;
