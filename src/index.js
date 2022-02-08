//------------------------------IMPORTS------------------------------
const express = require('express');
const app = express();
const morgan = require('morgan');
const sequelize = require('./models/db');
const authRoute = require('./routes/auth');
const personajeRoute = require('./routes/personaje');
const pelicula_o_serieRoute = require('./routes/pelicula_o_serie');
const generoRoute = require('./routes/genero');
const dotenv = require('dotenv');




//------------------------------CONFIGURACION------------------------------

dotenv.config();

app.set('port', process.env.PORT || 3000);

//------------------------------CONEXION BBDD------------------------------
const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Conexion con BBDD exitosa.');
        await sequelize.sync();

    } catch (error) {
        console.error('No se pudo conectar a la BBDD:', error);
    }


}

connection()



//------------------------------MIDDLEWARES------------------------------

app.use(express.json());

app.use(morgan('common'));

//------------------------------RUTAS------------------------------

app.use('/auth', authRoute);

app.use('/characters', personajeRoute);

app.use('/movies', pelicula_o_serieRoute)

app.use('/genero', generoRoute);


//------------------------------ABRIENDO SERVIDOR------------------------------

app.listen(app.get('port'), () => {

    console.log(`Servidor en el puerto ${app.get('port')}`);

});