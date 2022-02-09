
const sequelize = require('../models/db');



const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Conexion con BBDD exitosa.');
        await sequelize.sync();

    } catch (error) {
        console.error('No se pudo conectar a la BBDD:', error);
    }


}

module.exports = connection