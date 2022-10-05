const { Pool } = require("pg");
const connectionString = require("./config").DB_URI;
const db = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = { db };
