const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();
const personajeController = require('../controllers/personajeController');

/**
 * @swagger
 * tags:
 *  name: Personaje
 *  description: Personaje endpoints
 */


//CREAR PERSONAJE
/**
 * @swagger
 * /characters/create:
 *  post:
 *      summary: crea un nuevo personaje
 *      tags: [Personaje]
 */
router.post('/create', verifyToken, async (req, res) => {

    personajeController.post(req, res);

})


//UPDATE PERSONAJE
/**
 * @swagger
 * /characters/:id:
 *  put:
 *      summary: modifica a un personaje
 *      tags: [Personaje]
 */
router.put('/:id', verifyToken, async (req, res) => {

    personajeController.put(req, res);

})


//DELETE PERSONAJE
/**
 * @swagger
 * /characters/:id:
 *  delete:
 *      summary: elimina un personaje
 *      tags: [Personaje]
 */
router.delete('/:id', verifyToken, async (req, res) => {

    personajeController.delete(req, res);

})


//GET PERSONAJE DETALLE
/**
 * @swagger
 * /characters/:id:
 *  get:
 *      summary: obtiene el detalle de un personaje junto a sus peliculas asociadas
 *      tags: [Personaje]
 */
router.get('/:id', verifyToken, async (req, res) => {

    personajeController.getOne(req, res);

});


//GET TODOS PERSONAJES LISTADO
/**
 * @swagger
 * /characters:
 *  get:
 *      summary: obtiene un listado de todos los personajes con las propiedades nombre e imagen
 *      tags: [Personaje]
 */
router.get('/', verifyToken, async (req, res) => {

    personajeController.get(req, res);

});


module.exports = router;