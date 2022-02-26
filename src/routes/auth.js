const router = require('express').Router();
const verifyToken = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController')

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoints
 */

//REGISTER
/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: registro y creacion de usuario
 *      tags: [Auth]
 */
router.post('/register', async (req, res) => {

    authController.register(req, res);

});

//LOGIN
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: inicio de sesion del usuario
 *      tags: [Auth]
 */
router.post("/login", async (req, res) => {

    authController.login(req, res);

})

//LOGOUT
/**
 * @swagger
 * /auth/logout:
 *  post:
 *      summary: Salir sesion del usuario
 *      tags: [Auth]
 */

router.post('/logout', async (req, res) => {

    authController.logout(req, res)

})


//GET USUARIOS
/**
 * @swagger
 * /auth:
 *  get:
 *      summary: obtiene los datos de los usuarios 
 *      tags: [Auth]
 */
router.get('/', verifyToken, async (req, res) => {

    authController.get(req, res);

});




module.exports = router;