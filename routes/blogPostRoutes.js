const router = require('express').Router();
const { createPost, listAllPosts } = require('../controllers/blogspot');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createPost);
router.get('/', validateToken, listAllPosts);

module.exports = router;