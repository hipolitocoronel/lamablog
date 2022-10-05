const jwt = require("jsonwebtoken");
const { db } = require("../utils/db");
const { formatPost } = require("../utils/formatJSON");

const getPosts = (req, res) => {
    const query =
        'SELECT p.id, title, "desc", img, descripcion, date,"idCategory" ,u.name, u.username FROM posts p INNER JOIN categories c ON p."idCategory" = c.id INNER JOIN users u ON u.id = p."idUser"';
    db.query(query, (err, data) => {
        if (err) return res.status(500).json(err.stack);
        if (data.rows.length === 0)
            return res.status(404).json("No existe ningún blog");

        const posts = data.rows.map((post) => formatPost(post));
        return res.status(200).json(posts);
    });
};
const getPost = (req, res) => {
    const {
        params: { id },
    } = req;

    const query =
        'SELECT p.id, title, "desc", img, descripcion, u.name FROM posts p INNER JOIN categories c ON p."idCategory" = c.id AND p.id = $1 INNER JOIN users ON u.id = p."idUser"';

    db.query(query, [id], (err, data) => {
        if (err) return res.status(500).json(err.stack);
        if (data.rows.length === 0)
            return res.status(404).json(`No existe blog con id[${id}]`);

        return res.status(200).json(data.rows[0]);
    });
};

const addPost = (req, res) => {
    const { body } = req;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    const values = [
        decodedToken.id,
        body.title,
        body.desc,
        req.file.filename || null,
        new Date(),
    ];
    const query =
        'INSERT INTO posts ("idUser", title, "desc", img, date) VALUES ($1, $2, $3, $4, $5)';

    db.query(query, values, (err, data) => {
        if (err) return res.status(500).json(err.stack);
        return res.status(200).json("Blog agregado correctamente!");
    });
};

const updatePost = (req, res) => {};
const removePost = (req, res) => {};

module.exports = { getPosts, getPost, addPost, updatePost, removePost };
