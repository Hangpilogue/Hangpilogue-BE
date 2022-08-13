const Postrepositoty = require("../repositories/post.repositoty");

class PostServices {
    postrepositoty = new Postrepositoty();

    postcreate = async ( title, content, img, userId ) => {

        await this.postrepositoty.postcreate( title, content, img, userId );

    };

    postlistAll = async ( userId ) => {

        await this.postrepositoty.postlistAll( userId );

        let postlists = [];

        return postlists;

    };

    
};
module.exports = PostServices;