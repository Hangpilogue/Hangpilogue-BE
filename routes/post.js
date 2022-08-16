const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/post.controller");
const UserAuth = require("../middlewares/userAuth.middleware")

const postControllers = new PostControllers();

router.post("/", UserAuth, postControllers.postcreate);

router.get("/", postControllers.postlistAll);

router.get("/myposts", UserAuth, postControllers.mypostlist);

router.get("/:postId", postControllers.postOne);

router.put("/:postId", UserAuth, postControllers.postupdete);

router.delete("/:postId", UserAuth, postControllers.postdelete);

module.exports = router;
