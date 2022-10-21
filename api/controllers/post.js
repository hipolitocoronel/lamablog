const jwt = require("jsonwebtoken");
const { db } = require("../utils/db");
const { formatPost } = require("../utils/formatJSON");

const getPosts = (req, res) => {
    const query =
        'SELECT p.id, title, "desc", img, descripcion, "createdAt","updatedAt","idCategory" ,u.name, u.username FROM posts p INNER JOIN categories c ON p."idCategory" = c.id INNER JOIN users u ON u.id = p."idUser"';
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

    jwt.verify(req.token, process.env.SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json("Falta el token o es inválido");

        const values = [
            decodedToken.id,
            body.title,
            body.desc,
            body.file,
            body.cat,
            new Date(),
        ];

        const query =
            'INSERT INTO posts ("idUser", title, "desc", img, "idCategory" ,createdAt) VALUES ($1, $2, $3, $4, $5, $6)';

        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err.stack);
            return res.status(200).json("Blog agregado correctamente!");
        });
    });
};

const updatePost = (req, res) => {
    const { body } = req;

    jwt.verify(req.token, process.env.SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json("Falta el token o es inválido");
        const query = "SELECT * FROM posts WHERE id = $1";
        db.query(query, [body.id], (err, data) => {
            if (err) return res.status(500).json(err.stack);
            if (data.rows.length === 0)
                return res.status(404).json("No existe blog");
            const blog = data.rows[0];

            const values = [
                body.title,
                body.desc,
                body.file || blog.img,
                body.cat,
                new Date(),
                blog.id,
            ];
            const query =
                'UPDATE posts  SET title = $1, "desc" = $2, img = $3, "idCategory" = $4 ,"updatedAt" = $5 WHERE id = $6 RETURNING *';

            db.query(query, values, (err, data) => {
                if (err) return res.status(500).json(err.stack);
                return res.status(200).json(formatPost(data.rows[0]));
            });
        });
    });
};
const removePost = (req, res) => {
    const { body } = req;

    console.log(req.token);
    jwt.verify(req.token, process.env.SECRET, (err, decodedToken) => {
        if (err) return res.status(401).json("Falta el token o es inválido");

        const query = "DELETE FROM posts WHERE id = $1";
        db.query(query, [body.id], (err, data) => {
            if (err) return res.status(500).json(err.stack);

            return res.status(204).end();
        });
    });
};

const uploadImg = (req, res) => res.status(200).json(req.file.filename);

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    removePost,
    uploadImg,
};
