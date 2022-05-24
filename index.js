const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const router = express.Router();
const mysqlConnection = require('./api/connection/connection.js');

const app = express();

//Configuracion
app.set('port', process.env.PORT || 8000);

//Middelewares
app.use(bodyParser.urlencoded({ extended: false })); //Solo aceptaremos datos de un formulario de tipo string o number
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//Rutas
const userRoute = require('./api/routes/user.js');
app.use('/user', userRoute);


//Inicializacion del servidor
app.listen(app.get('port'), () => {
    console.log(`Listo :), Puerto ${app.get('port')}`);
});
