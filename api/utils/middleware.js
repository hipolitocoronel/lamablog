const multer = require("multer");
const logger = require("./logger");

const requestLogger = (req, res, next) => {
    logger.info("Method: ", req.method);
    logger.info("Path: ", req.path);
    logger.info("Body: ", req.body);
    logger.info("----------");
    next();
};

const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: "unknown endpoint" });
};

//image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}+${file.originalname}`);
    },
});

const uploadImage = multer({ storage });

module.exports = { requestLogger, unknownEndpoint, uploadImage };
