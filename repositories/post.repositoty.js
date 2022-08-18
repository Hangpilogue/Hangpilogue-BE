const { Posts } = require("../models");
const { Users } = require("../models");
const { Comments } = require("../models");
const {
    ForbiddenException,
    NotFoundException,
    BadRequestException,
  } = require("../exception/customException");

class Postrepositoty {

    postcreate = async ( title, content, img, userId ) => {
      try{
        await Posts.create({ title, content, img, userId, UserUserId:userId });
      } catch {
        throw new BadRequestException(`게시글 생성에 실패 했습니다.`) ;
      } 
    };

    postlistAll = async () => { 
      try{
        return await Posts.findAll({ 
            include: [{
                model: Users,
                attributes: ["nickname"],
                },{
                model: Comments,
                attributes: ["content"],
            }]
        });
      } catch {
        throw new NotFoundException(`테이블에서 값을 불러오지 못했다.`);
      };
    };

    mypostlist = async ( userId ) => {
      try{
        return await Posts.findAll({ where: { userId },
            include: {
                model: Users,
                attributes: ["nickname"],
            },
        });
      } catch {
        throw new ForbiddenException(`테이블에서 값을 불러오지 못했다.`);
      };
    };

    postOne = async ( postId ) => { 
      try{  
        return await Posts.findOne({ where: { postId },
            include: [{
                model: Users,
                attributes: ["nickname"],
                },{
                model: Comments,
                attributes: ["commentId","content","nickname"],
            }]
        });
      } catch {
        throw new ForbiddenException(`테이블에서 값을 불러오지 못했다.`);
      };
    };

    postupdete = async ( postId, userId, title, content, img ) => {
      try{  
        await Posts.update({ title, content, img }, { where: { postId, userId }});
      } catch {
        throw new ForbiddenException(`게시글의 주인이 아니다. 또는 찾는 게시물이 존재하지 않는다.`);
      };
    }; 

    postdelete = async ( postId, userId ) => {
      try{  
        await Posts.destroy({ where: { postId, userId }});
      } catch {
        throw new ForbiddenException(`게시글의 주인이 아니다. 또는 찾는 게시물이 존재하지 않는다.`);
      };
    };
    postcheck = async ( postId ) => { 
      try{
        return await Posts.findOne({ where: { postId }});
      }catch {
        throw new BadRequestException(`찾는 게시물이 존재하지 않는다.`);
      }
    };
};
module.exports = Postrepositoty;