const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Pelicula_o_serie = require('./Pelicula_o_serie');

//MODELO DE GENERO DE LAS PELICULAS

const Genero = sequelize.define('Genero', {
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
    peliculas_asociadas: {
        type: DataTypes.ARRAY(Sequelize.INTEGER),


    }

},

);

Genero.belongsToMany(Pelicula_o_serie, { foreignKey: 'peliculas_asociadas', through: 'Genero_Pelicula' });
Pelicula_o_serie.belongsToMany(Genero, { foreignKey: 'generoId', through: 'Genero_Pelicula' });


module.exports = Genero


