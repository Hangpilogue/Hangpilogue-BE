const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/post.controller");
const UserAuth = require("../middlewares/userAuth.middleware")

const postControllers = new PostControllers();

router.post("/post", UserAuth, postControllers.postcreate);

router.get("/posts", postControllers.postlistAll);

router.get("/posts/myposts", UserAuth, postControllers.mypostlist);

router.get("/posts/:postId", postControllers.postOne);

router.put("/posts/:postId", UserAuth, postControllers.postupdete);

router.delete("/posts/:postId", UserAuth, postControllers.postdelete);

module.exports = router;
