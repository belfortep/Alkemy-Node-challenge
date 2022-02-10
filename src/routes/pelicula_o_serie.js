const Pelicula = require('../models/Pelicula_o_serie');
const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();
const Personaje = require('../models/Personaje');
const Sequelize = require('sequelize');
const sequelize = require('../models/db');
const Op = Sequelize.Op;
const Genero = require('../models/Genero');


/**
 * @swagger
 * tags:
 *  name: Pelicula_o_Serie
 *  description: Pelicula o Serie endpoints
 */



//CREAR PELICULA
/**
 * @swagger
 * /movies/create:
 *  post:
 *      summary: crea una nueva pelicula
 *      tags: [Pelicula_o_Serie]
 */
router.post('/create', verifyToken, async (req, res) => {
    const newPelicula = new Pelicula(req.body);
    try {
        const savedPelicula = await newPelicula.save();
        res.status(200).json(savedPelicula);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE PELICULA
/**
 * @swagger
 * /movies/:id:
 *  put:
 *      summary: actualiza una pelicula
 *      tags: [Pelicula_o_Serie]
 */
router.put('/:id', verifyToken, async (req, res) => {
    try {

        await Pelicula.update({ titulo: req.body.titulo, imagen: req.body.imagen, fecha_creacion: req.body.fecha_creacion, calificacion: req.body.calificacion, personajes_asociados: req.body.personajes_asociados, generoId: req.body.generoId }, { where: { id: req.params.id } });

        res.status(200).json('Pelicula actualizada');

    } catch (err) {
        res.status(500).json(err);
    }

})

//DELETE PELICULA
/**
 * @swagger
 * /movies/:id:
 *  delete:
 *      summary: elimina una pelicula
 *      tags: [Pelicula_o_Serie]
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {

        await Pelicula.destroy({ where: { id: req.params.id } });

        res.status(200).json('Pelicula eliminada');

    } catch (err) {
        res.status(500).json(err);
    }

})




//GET PELICULA DETALLE
/**
 * @swagger
 * /movies/:id:
 *  get:
 *      summary: obtiene todos los valores de una pelicula, ademas del nombre de sus personajes asociados y el nombre de sus generos asociados
 *      tags: [Pelicula_o_Serie]
 */
router.get('/:id', verifyToken, async (req, res) => {

    try {

        const pelicula = await Pelicula.findOne({ where: { id: req.params.id } });


        for (let i = 0; i < pelicula.personajes_asociados.length; i++) {
            var personaje = await Personaje.findAll({ where: { id: pelicula.personajes_asociados }, attributes: ["nombre"] })
            var generos = await Genero.findAll({ where: { id: pelicula.generoId }, attributes: ['nombre'] })
        }

        res.status(200).json({ pelicula: pelicula, personajes_asociados: personaje, generos: generos });



    } catch (err) {
        res.status(500).json(err);
    }
});


//GET TODAS PELICULAS LISTADO
/**
 * @swagger
 * /movies:
 *  get:
 *      summary: obtiene un listado de todas las peliculas mostrando imagen, titulo y fecha_creacion.
 *      tags: [Pelicula_o_Serie]
 */
router.get('/', verifyToken, async (req, res) => {

    try {

        if (req.query.name === undefined && req.query.genre === undefined && req.query.order === undefined) {

            const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'] });

            res.status(200).json(peliculas);

        } else {
            if (req.query.name !== undefined) {
                const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'], where: { titulo: req.query.name } });
                res.status(200).json(peliculas);
            } else if (req.query.genre !== undefined) {
                const genre = []
                genre.push(parseInt(req.query.genre));

                const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'], where: { generoId: { [Op.contains]: genre } } });
                res.status(200).json(peliculas);
            } else if (req.query.order !== undefined) {
                if (req.query.order == 'ASC') {
                    const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'], order: sequelize.literal('fecha_creacion ASC') });
                    res.status(200).json(peliculas);
                } else if (req.query.order == 'DESC') {
                    const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'], order: sequelize.literal('fecha_creacion DESC') });
                    res.status(200).json(peliculas);
                } else {
                    const peliculas = await Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'] });
                    res.status(200).json(peliculas);
                }


            }

        }



    }
    catch (err) {
        res.status(500).json(err);
    }


});







module.exports = router;