const Commentrepository = require('../repositories/comment.repository')

class CommentServices {
  commentrepository = new Commentrepository();

  createcomment = async (postId, content, nickname) => {
    await this.commentrepository.createcomment(postId, content, nickname)
  };
  updatecomment = async (commentId, content) => {
    await this.commentrepository.updatecomment(commentId, content)
  }
  deletecomment = async (commentId, content) => {
    await this.commentrepository.deletecomment(commentId, content)

  }
}

module.exports = CommentServices;