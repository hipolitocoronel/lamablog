const postRouter = require("express").Router();
const { uploadImage } = require("../utils/middleware");

const {
    getPosts,
    getPost,
    addPost,
    uploadImg,
    updatePost,
    removePost,
} = require("../controllers/post");

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", addPost);
postRouter.post("/upload", uploadImage.single("file"), uploadImg);
postRouter.put("/", updatePost);
postRouter.delete("/", removePost);

module.exports = postRouter;
