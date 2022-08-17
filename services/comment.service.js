const Commentrepository = require('../repositories/comment.repository');

class CommentServices {
  commentrepository = new Commentrepository();

  createcomment = async (postId, content, nickname) => {
    const post = await this.commentrepository.postcheck(postId);
    if(!post){
      throw Error;
    }else{
      await this.commentrepository.createcomment(postId, content, nickname);
    };
  };

  updatecomment = async (postId, content, commentId, nickname) => {
    const post = await this.commentrepository.postcheck(postId);
    const name = await this.commentrepository.namecheck(commentId, nickname);
    if(!post || !name){
      throw Error;
    }else{
      await this.commentrepository.updatecomment(postId, content, commentId, nickname);
    };
    
  };

  deletecomment = async (postId, commentId, nickname) => {
    const post = await this.commentrepository.postcheck(postId);
    const name = await this.commentrepository.namecheck(commentId, nickname);
    if(!post || !name){
      throw Error;
    }else{
      await this.commentrepository.deletecomment(postId, commentId, nickname);
    };
   
  };
};

module.exports = CommentServices;