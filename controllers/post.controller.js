const PostServices = require("../services/post.service");
const exceptionHandler = require("../errorhandler/exception.handler");
class PostControllers {
   
    postServices = new PostServices()

    postcreate = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 
            const { title, content, img } = req.body;
            const result = await this.postServices.postcreate( title, content, img, userId )
            res.status(200).send(result);
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };

    postlistAll = async (req, res, next) => {
        try{ 
            const postlists = await this.postServices.postlistAll();
            res.status(200).json({ postlists });
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };

    mypostlist = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 
            const { page } = req.params;
            const mypostlists = await this.postServices.mypostlist( userId, page );
            res.status(200).json({ mypostlists });
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };

    postOne = async (req, res, next) => {  
        try{ 
            const { postId } = req.params; 
            const postone = await this.postServices.postOne( postId );
            res.status(200).json({ postone });
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };

    postupdete = async (req, res, next) => {  
        try{ 
            const { postId } = req.params; 
            const { userId } = res.locals; 
            const { title, content, img } = req.body;
            const result = await this.postServices.postupdete( postId, userId, title, content, img );
            res.status(200).send(result);
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };

    postdelete = async (req, res, next) => {  
        try{ 
            const { postId } = req.params; 
            const { userId } = res.locals; 
            const result = await this.postServices.postdelete( postId, userId );
            res.status(200).send(result);
        }catch(err){
            const exception = exceptionHandler(err);

            return res.status(exception.statusCode).json(exception.message);
        };
    };
};
module.exports = PostControllers;