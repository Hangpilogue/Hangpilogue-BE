const CommentService = require('../services/comment.service')

class CommentControllers {
  commentService = new CommentService()

  createcomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const { nickname } = res.locals

      await this.commentService.createcomment(postId, content, nickname)
      return res.status(200).send({ result: true });
    }
    catch (err) {
      return res.status(400).send(err.message);
    }
  }

  updatecomment = async (req, res, next) => {
    try {
      const { content } = req.body;
      const { commentId } = req.params;
      console.log(content, commentId)
      const Content = await this.commentService.updatecomment(content, commentId)

      return res.status(200).send({ Content })

    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
  deletecomment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      await this.commentService.deletecomment(postId)
      return res.status(200).send({ msg: '댓글이 삭제 되었습니다.' })
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
}

module.exports = CommentControllers;