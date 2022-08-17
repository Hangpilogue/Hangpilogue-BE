const { Comments } = require('../models');
const { Posts } = require('../models');

class Commentrepository {

  createcomment = async (postId, content, nickname) => {
    await Comments.create({ postId, content, nickname, PostPostId:postId });
  };

  updatecomment = async (postId, content, commentId, nickname) => {
    await Comments.update({ content }, { where: {postId, commentId, nickname} });
  };

  deletecomment = async (postId, commentId, nickname) => {
    await Comments.destroy({ where: {postId, commentId, nickname} });
  };

  postcheck = async ( postId ) => { 
    return await Posts.findOne({ where: { postId }});
  };
  namecheck = async (commentId, nickname) => { 
    return await Comments.findOne({ where: {commentId, nickname}});
  };
};


module.exports = Commentrepository;