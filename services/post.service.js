const Postrepositoty = require("../repositories/post.repositoty");
const {
  NotFoundException,
  BadRequestException,
} = require("../exception/customException");
class PostServices {

    postrepositoty = new Postrepositoty();

    postcreate = async ( title, content, img, userId ) => {
      console.log( title, content, img)
      if(title===undefined || content===undefined){
        throw new BadRequestException(`게시글이나 내용이 없다.`);
      }
      await this.postrepositoty.postcreate( title, content, img, userId );
      return { result: true, message: "게시글이 생성되었습니다." }
    };

    postlistAll = async () => {
        const postlists = await this.postrepositoty.postlistAll();
      try{
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
      } catch {
        throw new BadRequestException(`값을 원하는대로 조정 중에 에러`);
      }

    };

    mypostlist = async ( userId, page ) => {  
        const mypostlists = await this.postrepositoty.mypostlist( userId );
      try{  
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
        if (page > totalPage){
            return { errormessage : "그 패이지는 존재하지 않습니다."}
        }
        let firstNumber = lastNumber - (pageCount - 1) // 1,6,7
        if (lastNumber > totalPage) {
            firstNumber = lastNumber-4
            lastNumber = totalPage
        }
        if (firstNumber < 1 ){
            firstNumber = 1
            lastNumber = totalPage//pageCount
        }
        const length = lastNumber - firstNumber +1
        const next = lastNumber*10-1
        const prev = lastNumber*10-1-length*10
        const mypage = mypostlists.map(post => {
            return {
                postId: post.postId,
                title: post.title,
                nickname: post.User.nickname,
                createdAt: post.createdAt,
            }
        });
        return {
            currentPages: Array.from({ length }, (v, i) => i + firstNumber),
            mypage: mypage.slice(prev, next)
        };
      } catch {
        throw new BadRequestException(`값을 원하는대로 조정 중에 에러`);
      }  
    };

    postOne = async ( postId ) => {  
        const postone = await this.postrepositoty.postOne( postId );
      try{
        return {
            postId: postone.postId,
            title: postone.title,
            img: postone.img,
            nickname: postone.User.nickname,            
            content: postone.content,
            Comments: postone.Comments
          };
      } catch {
        throw new BadRequestException(`값을 원하는대로 조정 중에 에러`);
      }  
    };

    postupdete = async ( postId, userId, title, content, img ) => { 
      const postlook = await this.postrepositoty.postcheck( postId )
      if(title===undefined || content===undefined){
        throw new BadRequestException(`게시글이나 내용이 없다.`);
      }
      if(!postlook){
        throw new NotFoundException(`게시글을 찾을 수 없다.`);
      }else{
        await this.postrepositoty.postupdete( postId, userId, title, content, img );
        return { result: true, message: "게시글 수정 했습니다."}
      };
    };

    postdelete = async ( postId, userId ) => {  
      const postlook = await this.postrepositoty.postcheck( postId )
      if(!postlook){
        throw new NotFoundException(`게시글을 찾을 수 없다.`);
      }else{
        await this.postrepositoty.postdelete( postId, userId );
        return{ result: true, message: "댓글이 삭제되었습니다." }
      };
    };
};
module.exports = PostServices;