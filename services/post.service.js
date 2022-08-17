const Postrepositoty = require("../repositories/post.repositoty");

class PostServices {

    postrepositoty = new Postrepositoty();

    postcreate = async ( title, content, img, userId ) => {
        await this.postrepositoty.postcreate( title, content, img, userId );
    };

    postlistAll = async () => {
        const postlists = await this.postrepositoty.postlistAll();
        postlists.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        return postlists.map(post => {
            return {
              postId: post.postId,
              img: post.img,
              title: post.title,
              nickname: post.User.nickname,
              countcomment: post.Comments.length,
            }
        });
    };

    mypostlist = async ( userId, page ) => {  
        const mypostlists = await this.postrepositoty.mypostlist( userId );
        mypostlists.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })

        const totalCount = mypostlists.length //총 게시글 개수]
        const limit = 10 //페이지의 게시글 개수
        let totalPage = Math.ceil(totalCount / limit) //페이지 나누어진 개수
        const currentPage = page //현제 보고있는 페이지 위치 숫자 (받아오는 값)
        const pageCount = 5 //페이지 개수 및에 뜨는 숫자의 개수
        let pageGroup = Math.ceil(currentPage / pageCount) //1,2,3... 페이지 그룹의 위치 12345,인지, 23456, 678910인지
        let lastNumber = pageGroup * pageCount // 5,10,15 나올수있다.....계속 되거나
        if (lastNumber > totalPage) {
            lastNumber = totalPage
        }
        let firstNumber = lastNumber - (pageCount - 1) // 1,6,7
        if (firstNumber < 1 ){
            firstNumber = 1
            lastNumber = pageCount
        }
        const next = lastNumber*10-1
        const prev = lastNumber*10-50
        const mypage = mypostlists.map(post => {
            return {
                postId: post.postId,
                title: post.title,
                nickname: post.User.nickname,
                createdAt: post.createdAt,
            }
        });
        return {
            currentPages: Array.from({ length: 5 }, (v, i) => i + firstNumber),
            mypage: mypage.slice(prev, next)
        }
    };

    postOne = async ( postId ) => {  
        const postone = await this.postrepositoty.postOne( postId );
        return {
            postId: postone.postId,
            title: postone.title,
            img: postone.img,
            nickname: postone.User.nickname,            
            content: postone.content,
            Comments: postone.Comments
          };
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