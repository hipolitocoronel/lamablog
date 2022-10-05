const postRouter = require("express").Router();
const { uploadImage } = require("../utils/middleware");

const {
    getPosts,
    getPost,
    addPost,
    updatePost,
    removePost,
} = require("../controllers/post");

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", uploadImage.single("file"), addPost);
postRouter.put("/", updatePost);
postRouter.delete("/", removePost);

module.exports = postRouter;
