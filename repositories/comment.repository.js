const { Comments } = require('../models');

class Commentrepository {

  createcomment = async (postId, content, nickname) => {
    console.log(nickname, content, postId)
    await Comments.create({ postId, content, nickname });

  }
  updatecomment = async (commentId, content) => {
    console.log(content, commentId)
    await Comments.update({ content }, { where: { commentId } });
  }
  deletecomment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
  }
}


module.exports = Commentrepository