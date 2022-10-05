const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const middleware = require("./utils/middleware");


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static("public"));

app.use("/api/", authRouter);
app.use("/api/posts", postRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
