const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();
const pelicula_o_serieController = require('../controllers/pelicula_o_serieController');

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

    pelicula_o_serieController.post(req, res);

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

    pelicula_o_serieController.put(req, res);

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

    pelicula_o_serieController.delete(req, res);

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

    pelicula_o_serieController.getOne(req, res);

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

    pelicula_o_serieController.get(req, res);

});







module.exports = router;