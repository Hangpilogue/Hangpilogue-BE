const CommentService = require('../services/comment.service');

class CommentControllers {
  commentService = new CommentService();

  createcomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const { nickname } = res.locals;

      await this.commentService.createcomment(postId, content, nickname);
      return res.status(200).json({ result: true });
    } catch (err) {
      return res.status(400).json({ result: false });
    };
  };

  updatecomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { postId, commentId } = req.params;
      const { nickname } = res.locals;
      await this.commentService.updatecomment(postId, content, commentId, nickname);

      return res.status(200).json({ esg : "댓글이 수정 되었습니다."});
    } catch (err) {
      return res.status(400).json({ esg : "댓글 수정 실패"});
    }
  }
  deletecomment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { nickname } = res.locals;
      await this.commentService.deletecomment(postId, commentId, nickname);
      return res.status(200).json({ msg: '댓글이 삭제 되었습니다.' });
    } catch (err) {
      return res.status(400).json({ msg: '댓글이 삭제 실패' });
    };
  };
};

module.exports = CommentControllers;