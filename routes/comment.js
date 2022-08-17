const express = require('express');
const router = express.Router();
const CommentControllers = require('../controllers/comment.controller')
const UserAuth = require('../middlewares/userAuth.middleware')

const commentControllers = new CommentControllers();

router.use(UserAuth);
router.post('/:postId/comment', commentControllers.createcomment);
router.put('/:postId/:commentId', commentControllers.updatecomment);
router.delete('/:postId/:commentId/', commentControllers.deletecomment);

module.exports = router;
