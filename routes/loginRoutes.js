const router = require('express').Router();
const { login } = require('../controllers/user');

router.post('/', login);

module.exports = router;
