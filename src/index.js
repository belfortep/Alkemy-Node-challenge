//------------------------------IMPORTS------------------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const personajeRoute = require('./routes/personaje');
const pelicula_o_serieRoute = require('./routes/pelicula_o_serie');
const generoRoute = require('./routes/genero');
const dotenv = require('dotenv');
const connection = require('./connection/connection');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = require('./config/config');




//------------------------------CONFIGURACION------------------------------

dotenv.config();

app.set('port', process.env.PORT || 3000);

const specs = swaggerJSDoc(options)

//------------------------------CONEXION BBDD------------------------------

connection();

//------------------------------MIDDLEWARES------------------------------

app.use(express.json());

app.use(morgan('common'));

//------------------------------RUTAS------------------------------

app.use('/auth', authRoute);

app.use('/characters', personajeRoute);

app.use('/movies', pelicula_o_serieRoute)

app.use('/genero', generoRoute);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

//------------------------------ABRIENDO SERVIDOR------------------------------

app.listen(app.get('port'), () => {

    console.log(`Servidor en el puerto ${app.get('port')}`);

});