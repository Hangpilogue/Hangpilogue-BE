const Postrepositoty = require("../repositories/post.repositoty");

class PostServices {
    
    postrepositoty = new Postrepositoty();

    postcreate = async ( title, content, img, userId ) => {
            //나중에 형식에 맏는지? (불필요)
        await this.postrepositoty.postcreate( title, content, img, userId );

    };

    postlistAll = async () => { //좋아요 개수 조회 // 댓글 개수 조회
            //시간 순서에 맞추어 정렬 , title,img,nickname,countcomment(댓글수),countlike(좋아요수)
        let postlists = [];

        await this.postrepositoty.postlistAll();
       
        return postlists;

    };

    mypostlist = async ( userId ) => {  
            //시간 순서에 맞추어 정렬, title,nickname,createdAt
        let mypostlists = [];

        await this.postrepositoty.mypostlist( userId );
       
        return mypostlists;

    };

    postOne = async ( postId ) => {  
        //title,img,nickname,countcomment(댓글수),countlike(좋아요수) [댓글 행렬로 가공]
    let post = [];

    await this.postrepositoty.postOne( postId );
   
    return post;

    };

    postupdete = async ( postId, title, content, img ) => {  //나중에 형식 생각
        // 게시물이 존재 하는지 확인 (먼저 있는지 확인후)
    await this.postrepositoty.postupdete( postId, title, content, img );

    };

    postdelete = async ( postId ) => {  
        // 게시물이 존재 하는지 확인 (먼저 있는지 확인후)
    await this.postrepositoty.postdelete( postId );

    };
};
module.exports = PostServices;