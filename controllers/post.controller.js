const PostServices = require("../services/post.service");

class PostControllers {
   
    postServices = new PostServices()

    postcreate = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 
            const { title, content, img } = req.body;
      
            await this.postServices.postcreate( title, content, img, userId )
   
            res.status(200)
            .json({ result : true });
        }catch(err){
            return res.status(400).send(err.message);
            
        };
    };

    postlistAll = async (req, res, next) => {
        try{ 
            const { userId } = res.locals; 

            const postlists = await this.postServices.postlistAll( userId );

            res.status(200)
            .json({ postlists });
        }catch(err){
            return res.status(400).send(err.message);
        };
    };
};
module.exports = PostControllers;