const Genero = require('../models/Genero');
const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *  name: Genero
 *  description: Genero endpoints
 */



//CREAR GENERO
/**
 * @swagger
 * /genero/create:
 *  post:
 *      summary: crea un nuevo genero de pelicula 
 *      tags: [Genero]
 */
router.post('/create', verifyToken, async (req, res) => {
    const newGenero = new Genero(req.body);
    try {
        const savedGenero = await newGenero.save();
        res.status(200).json(savedGenero);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE GENERO
/**
 * @swagger
 * /genero/:id:
 *  put:
 *      summary: modifica un genero de pelicula
 *      tags: [Genero]
 */
router.put('/:id', verifyToken, async (req, res) => {
    try {

        await Genero.update({ imagen: req.body.imagen, nombre: req.body.nombre, peliculas_asociadas: req.body.peliculas_asociadas }, { where: { id: req.params.id } });

        res.status(200).json('Genero actualizado');

    } catch (err) {
        res.status(500).json(err);
    }

})

//DELETE GENERO
/**
 * @swagger
 * /genero/:id:
 *  delete:
 *      summary: elimina un genero de pelicula
 *      tags: [Genero]
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {

        await Genero.destroy({ where: { id: req.params.id } });

        res.status(200).json('Genero eliminado');

    } catch (err) {
        res.status(500).json(err);
    }

})



//GET TODOS GENEROS
/**
 * @swagger
 * /genero:
 *  get:
 *      summary: obtiene todos los generos de las peliculas
 *      tags: [Genero]
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const generos = await Genero.findAll();

        res.status(200).json(generos);

    }
    catch {
        res.status(500).json(err);
    }

});







module.exports = router;