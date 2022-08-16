const PostServices = require("../services/post.service");

class PostControllers {
   
    postServices = new PostServices()

    postcreate = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 
            const { title, content, img } = req.body;
            await this.postServices.postcreate( title, content, img, userId )
            return res.status(200).json({ result: true });
        }catch(err){
            return res.status(400).json({ result: false });
        };
    };

    postlistAll = async (req, res, next) => {  //좋아요 개수 조회 // 댓글 개수 조회
        try{ 
            const postlists = await this.postServices.postlistAll();

            res.status(200).json({ postlists });
        }catch(err){
            return res.status(400).json({errormessage: "게시글 조회에 실패"});
        };
    };

    mypostlist = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 

            const mypostlists = await this.postServices.mypostlist( userId );

            res.status(200).json({ mypostlists });
        }catch(err){
            return res.status(400).json({errormessage: "게시글 조회에 실패"});
        };
    };

    postOne = async (req, res, next) => {  //좋아요 개수 조회 // 댓글 개수 조회
        try{ 
            const { postId } = req.params; 

            const postone = await this.postServices.postOne( postId );

            res.status(200).json({ postone });
        }catch(err){
            return res.status(400).json({errormessage: "게시글 조회에 실패"});
        };
    };

    postupdete = async (req, res, next) => {  
        try{ 
            const { postId } = req.params; 
            const { userId } = res.locals; 
            const { title, content, img } = req.body;

            await this.postServices.postupdete( postId, userId, title, content, img );

            return res.status(200).json( {message: "게시글 수정 했습니다."} );
        }catch(err){
            return res.status(400).json({errormessage: "게시글 수정에 실패"});
        };
    };

    postdelete = async (req, res, next) => {  //좋아요 개수 조회 // 댓글 개수 조회
        try{ 
            const { postId } = req.params; 
            const { userId } = res.locals; 

            await this.postServices.postdelete( postId, userId );

            res.status(200).json({ message: "댓글이 삭제되었습니다." });
        }catch(err){
            return res.status(400).json({errormessage: "게시글 삭제에 실패"});
        };
    };
};
module.exports = PostControllers;