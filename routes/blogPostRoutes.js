const router = require('express').Router();
const { createPost } = require('../controllers/blogspot');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createPost);

module.exports = router;