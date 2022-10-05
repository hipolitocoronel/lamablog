const { db } = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    const { body } = req;

    const query = "SELECT * FROM users WHERE username = $1";
    db.query(query, [body.username], async (err, data) => {
        if (err) return res.status(500).json(err.stack);
        if (data.rows.length === 0)
            return res.status(404).json("Nombre de usuario no válido");

        const user = data.rows[0];

        const passwordCorrect = await bcrypt.compare(
            body.password,
            user.passwordHash
        );

        if (!passwordCorrect)
            return res.status(401).json("Verifique su contraseña");

        const token = jwt.sign(
            {
                username: user.username,
                id: user.id,
            },
            process.env.SECRET
        );

        return res
            .status(200)
            .json({ token, username: user.username, name: user.name });
    });
};

const register = (req, res) => {
    const { body } = req;
    const query = "SELECT * FROM users WHERE username = $1 OR email = $2";

    db.query(query, [body.username, body.email], async (err, data) => {
        if (err) return res.status(500).json(err.stack);
        if (data.rows.length !== 0) {
            data.rows[0].username === body.username
                ? res.status(400).json("Nombre de usuario no disponible")
                : res.status(400).json("Correo ya registrado");
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = [body.name, body.username, body.email, passwordHash];
        const query =
            'INSERT INTO users (name, username, email, "passwordHash") VALUES ($1 , $2, $3, $4)';

        db.query(query, user, (err, data) => {
            if (err) return res.status(500).json(err.stack);
            return res.status(200).json("Usuario registrado corectamente!")
        });
    });
};

module.exports = { login, register };
