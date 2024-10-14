const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'sucursales', 
    port: 3306 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
