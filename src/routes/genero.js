const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();
const generoController = require('../controllers/generoController');

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

    generoController.post(req, res)

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

    generoController.put(req, res);

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

    generoController.delete(req, res);

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

    generoController.get(req, res)

});







module.exports = router;