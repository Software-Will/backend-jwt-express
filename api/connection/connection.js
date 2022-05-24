const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jwt-test'
});

mysqlConnection.connect(err => {
    if (err) {
        console.log(`Error en la BD ${err}`);
    } else {
        console.log(`DB Conectado :)`);
    }
});

module.exports = mysqlConnection;