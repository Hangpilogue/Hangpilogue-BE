const { Post } = require("../models");

class Postrepositoty {

    postcreate = async ( title, content, img, userId ) => {
        await Post.create({ title, content, img, userId })
    };

    postlistAll = async ( userId ) => {

        const postlists = await Post.findAll({ where: { userId }})
        return postlists;
    };
}
module.exports = Postrepositoty;