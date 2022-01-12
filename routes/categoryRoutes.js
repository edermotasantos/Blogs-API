const router = require('express').Router();
const { createCategory, listAllCategories } = require('../controllers/category');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createCategory);
router.get('/', validateToken, listAllCategories);

module.exports = router;