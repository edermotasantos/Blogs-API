const router = require('express').Router();
const { createCategory } = require('../controllers/category');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createCategory);

module.exports = router;