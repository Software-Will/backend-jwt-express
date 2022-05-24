const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection.js');

const jwt = require('jsonwebtoken');

//SEL de usuarios
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        };
    });
});

//Validacion de user
router.post('/singin', (req, res) => {
    const { userName, pass } = req.body;//Modifica no deberia mostar el pass
    mysqlConnection.query('SELECT * FROM user WHERE username=? and pass=?',
        [userName, pass],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {
                    let data = JSON.stringify(rows[0]); //Convertimos el RowDataPacket a JSON
                    const token = jwt.sign(data, 'stil'); //Encriptacion de validacion
                    res.json({ token });
                } else {
                    res.json('Usuario o Clave incorrecto');
                }
            } else {
                console.log(err);
            }
        });
});

//Verifica el token -> Primero pasara por la validacion del token para dar acceso a las funciones
router.post('/test', verifyToken, (req, res) => {
    console.log(req.data);
    /*if (req.data.roleId === 'user') {
    }*/
    res.json('Informacion secreta');
});


function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);// -> <Bearer ><Token>

    if (token !== '') {
        const content = jwt.verify(token, 'stil'); //Decodifica el token y me devulve la informacion
        //console.log(content);
        req.data = content;
        next();
    } else {
        res.status(401).json('Token Vacio');
    }
    //console.log(token);
}

module.exports = router;