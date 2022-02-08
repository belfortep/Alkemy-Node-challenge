const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config()

//OBTENER DATOS BASE DE DATOS A CONECTAR
const sequelize = new Sequelize(process.env.BBDD_DATABASE_NAME, process.env.BBDD_USERNAME, process.env.BBDD_PASSWORD, {

    host: process.env.BBDD_SERVER,
    dialect: 'postgres'


})

module.exports = sequelize