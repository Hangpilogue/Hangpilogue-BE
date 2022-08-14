const { Post } = require("../models");
const { User } = require("../models");

class Postrepositoty {

    postcreate = async ( title, content, img, userId ) => {

        await Post.create({ title, content, img, userId });

    };

    postlistAll = async () => {  //좋아요 개수 조회 // 댓글 개수 조회

        const postlists = await Post.findAll({ 
            include: [{
                model: User,
                attributes: ["nickname"],
                },{
                model: Comment,
                attributes: ["CommentId"],//개수 새는 법??
            }]
        });

        return postlists;
    };

    mypostlist = async ( userId ) => {

        const mypostlists = await Post.findAll({ where: { userId },
            include: {
                model: User,
                attributes: ["nickname"],
            },
        });

        return mypostlists;
    };

    postOne = async ( postId ) => { //좋아요 개수 조회 // 댓글 개수 조회

        const post = await Post.findAll({ where: { postId },
            include: [{
                model: User,
                attributes: ["nickname"],
                },{
                model: Comment,
                attributes: ["content"],
            }]
        });

        return post;
    };

    postupdete = async ( postId, title, content, img ) => {

        await Post.update({ title, content, img }, { where: { postId }});
    };

    postdelete = async ( postId ) => {

        await Post.destroy({ where: { postId }});
    };
};
module.exports = Postrepositoty;