const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verifyToken = require('../middlewares/authMiddleware');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch')
const nodemailer = require('nodemailer');

dotenv.config();

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
    try {
        //HASH DE LA PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.contrasegna, salt);

        //CREANDO EL NUEVO USUARIO
        const newUser = new User({
            nombre: req.body.nombre,
            contrasegna: hashedPassword,
            email: req.body.email
        });

        //GUARDANDO EL USUARIO
        const user = await newUser.save();
        //ENVIO DE MAIL A USUARIO CON NODEMAILER, hay que desactivar la seguridad de la cuenta de google para que funcione
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MI_MAIL,
                pass: process.env.MI_MAIL_CLAVE
            }
        });
        const mailOptions = {
            from: process.env.MI_MAIL,
            to: req.body.email,
            subject: 'Bienvenida a Disney',
            text: 'Bienvenido al mágico mundo de Disney!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado a: ' + info.response);
            }
        });

        res.status(200).json(user);
    } catch (err) {

        res.status(500).json(err);

    }

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
    try {

        const user = await User.findOne({ where: { nombre: req.body.nombre } });
        !user && res.status(404).send("Usuario no encontrado") //busca usuario por nombre
        const token = jwt.sign({ user }, process.env.SECRET_KEY);
        localStorage.setItem('token', token);

        const validPassword = await bcrypt.compare(req.body.contrasegna, user.contrasegna);
        !validPassword && res.status(400).json("Contraseña incorrecta");  //compara contraseña en BBDD con la enviada
        res.status(200).json(token);
    } catch (err) {
        res.status(500).json(err);
    }

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
    const users = await User.findAll();
    res.json(users);
});



module.exports = router;