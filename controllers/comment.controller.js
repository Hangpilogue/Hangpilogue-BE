const CommentService = require('../services/comment.service');

class CommentControllers {
  commentService = new CommentService();

  createcomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const { nickname } = res.locals;

      await this.commentService.createcomment(postId, content, nickname);

    } catch (err) {
      return res.status(400).json({ result: false });
    };
  };

  updatecomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { postId, commentId } = req.params;
      const { nickname } = res.locals;
      const Updatecomment = await this.commentService.updatecomment(
        postId,
        content,
        commentId,
        nickname
      );
      res.json({ Updatecomment })
    } catch (err) {
      next();
    }

  }
  deletecomment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { nickname } = res.locals;
      const Deletecomment = await this.commentService.deletecomment(
        postId,
        commentId,
        nickname
      );
      res.json({ Deletecomment })
    } catch (err) {
      next();
    };
  };
};

module.exports = CommentControllers;