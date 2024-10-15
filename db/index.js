const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'binar_challenge',
    user: 'binar',
    password: 'binarkm7',
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
