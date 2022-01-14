const router = require('express').Router();
const {
  createPost,
  listAllPosts,
  listPostById,
  updatePostById,
} = require('../controllers/blogspot');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createPost);
router.get('/', validateToken, listAllPosts);
router.get('/:id', validateToken, listPostById);
router.put('/:id', validateToken, updatePostById);

module.exports = router;