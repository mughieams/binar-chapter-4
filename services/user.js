const db = require('../db');

class User {
    id = null;
    name = null;
    email = null;
    password = null;

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async register() {
        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [this.name, this.email, this.password];

        const res = await db.query(query, values);
        this.setID(res.rows[0].id);
    }

    setID(id) {
        this.id = id;
    }

    getID() {
        return this.id;
    }

    getPassword() {
        return '********';
    }
}

exports.User = User;
