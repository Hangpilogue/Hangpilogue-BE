const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/post.controller");

const postControllers = new PostControllers();

router.post("/post", postControllers.postcreate);

router.get("/posts", postControllers.postlistAll);

router.get("/posts/myposts", postControllers.mypostlist);

router.get("/posts/:postId", postControllers.postOne);

router.put("/posts/:postId", postControllers.postupdete);

router.delete("/posts/:postId", postControllers.postdelete);

module.exports = router;
