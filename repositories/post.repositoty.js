const { Posts } = require("../models");
const { Users } = require("../models");
const { Comments } = require("../models");
class Postrepositoty {

    postcreate = async ( title, content, img, userId ) => {
        await Posts.create({ title, content, img, userId, UserUserId:userId });
    };

    postlistAll = async () => { 
        return await Posts.findAll({ 
            include: [{
                model: Users,
                attributes: ["nickname"],
                },{
                model: Comments,
                attributes: ["content"],//개수 새는 법??
            }]
        });
    };

    mypostlist = async ( userId ) => {
        return await Posts.findAll({ where: { userId },
            include: {
                model: Users,
                attributes: ["nickname"],
            },
        });
    };

    postOne = async ( postId ) => { //좋아요 개수 조회 // 댓글 개수 조회
        return await Posts.findOne({ where: { postId },
            include: [{
                model: Users,
                attributes: ["nickname"],
                },{
                model: Comments,
                attributes: ["commentId","content","nickname"],
            }]
        });
    };

    postupdete = async ( postId, userId, title, content, img ) => {
        await Posts.update({ title, content, img }, { where: { postId, userId }});
    };

    postdelete = async ( postId, userId ) => {
        await Posts.destroy({ where: { postId, userId }});
    };
    postcheck = async ( postId ) => { 
        return await Posts.findOne({ where: { postId }});
    };
};
module.exports = Postrepositoty;