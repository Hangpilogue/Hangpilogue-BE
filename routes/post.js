const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/post.controller");

const postControllers = new PostControllers();

router.post("/post", postControllers.postcreate);

router.get("/posts", postControllers.postlistAll);

// router.get("/posts/myposts", postControllers);

// router.get("/posts/:postId", postControllers);

// router.put("/posts/:postId", postControllers);

// router.delete("/posts/:postId", postControllers);

module.exports = router;
