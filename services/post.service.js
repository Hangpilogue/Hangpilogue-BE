const Postrepositoty = require("../repositories/post.repositoty");

class PostServices {

    postrepositoty = new Postrepositoty();

    postcreate = async ( title, content, img, userId ) => {
        await this.postrepositoty.postcreate( title, content, img, userId );
    };

    postlistAll = async () => {
            // title,img,nickname,countcomment(댓글수),countlike(좋아요수)
        const postlists = await this.postrepositoty.postlistAll();
        postlists.sort((a, b) => { //시간 순서에 맞추어 정렬
            return b.createdAt - a.createdAt;
        });
        return postlists.map(post => {
            return {
              postId: post.postId,
              img: post.img,
              title: post.title,
              nickname: post.User.nickname,
              content: post.content,
            //   countcomment : 댓글 게수(배열의 길이),
            //   countlike: 좋아요.(좋아요가 생기면 배열의 길이),
            }
        });
    };

    mypostlist = async ( userId ) => {  
            //시간 순서에 맞추어 정렬, title,nickname,createdAt
        const mypostlists = await this.postrepositoty.mypostlist( userId );
        mypostlists.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
        return mypostlists.map(post => {
            return {
              postId: post.postId,
              title: post.title,
              nickname: post.User.nickname,
              createdAt: post.createdAt,
            //   updatedAt: post.updatedAt
            }
        });
    };

    postOne = async ( postId ) => {  
        //countcomment(댓글수),countlike(좋아요수) [댓글 행렬로 가공]
        const postone = await this.postrepositoty.postOne( postId );
        return {
            postId: postone.postId,
            title: postone.title,
            img: postone.img,
            nickname: postone.User.nickname,            
            content: postone.content,
            Comments: postone.Comments
            // countcomment : 댓글 게수(배열의 길이),
            // countlike: 좋아요.(좋아요가 생기면 배열의 길이),
          };
        return postone
        // return postone.map(post => {
        //     return {
        //       postId: post.postId,
        //       title: post.title,
        //       img: postone.img,
        //       nickname: post.User.nickname,
        //       content: postone.content,
        //       countcomment : 댓글 게수(배열의 길이),
        //       countlike: 좋아요.(좋아요가 생기면 배열의 길이),
        //     }
        // });
    };

    postupdete = async ( postId, userId, title, content, img ) => { 
        const postlook = await this.postrepositoty.postcheck( postId )
        if(!postlook){
            throw Error;
        }else{
            await this.postrepositoty.postupdete( postId, userId, title, content, img );
        };
    };

    postdelete = async ( postId, userId ) => {  
        const postlook = await this.postrepositoty.postcheck( postId )
        if(!postlook){
            throw Error;
        }else{
            await this.postrepositoty.postdelete( postId, userId );
        };
    };
};
module.exports = PostServices;