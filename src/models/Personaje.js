const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

//MODELO DE LOS PERSONAJES DE LAS PELICULAS

const Personaje = sequelize.define('Personaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING,

    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER

    },
    historia: {
        type: DataTypes.STRING

    },
    peliculas: {
        type: DataTypes.ARRAY(Sequelize.INTEGER),

    },

},

);






module.exports = Personaje
