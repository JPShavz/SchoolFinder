// db.js — MySQL connection pool
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root1234', // ← your MySQL root password
    database: 'school_finder',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use Promise-based API for async/await
module.exports = pool.promise();
