const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Personaje = require('./Personaje');

//MODELO DE LAS PELICULAS O SERIES

const Pelicula_o_serie = sequelize.define('Pelicula_o_serie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING,

    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: false
    },
    personajes_asociados: {
        type: DataTypes.ARRAY(Sequelize.INTEGER),
        allowNull: false

    },
    generoId: {
        type: DataTypes.ARRAY(Sequelize.INTEGER),
        allowNull: false
    },

},

);

Pelicula_o_serie.belongsToMany(Personaje, { foreignKey: 'personajes_asociados', through: 'Personaje_Pelicula' });
Personaje.belongsToMany(Pelicula_o_serie, { foreignKey: 'peliculas', through: 'Personaje_Pelicula' });



module.exports = Pelicula_o_serie

