const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'teste_bd'
});

async function getProductById(id) {
    const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
}

async function getProductsByPartialName(partialName) {
    const [rows] = await connection.query('SELECT * FROM produtos WHERE nome LIKE ?', [`%${partialName}%`]);
    return rows;
}

module.exports = { getProductById, getProductsByPartialName, connection };
