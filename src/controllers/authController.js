const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch')
const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const authController = {}

dotenv.config();


authController.register = async (req, res) => {

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

}

authController.login = async (req, res) => {

    try {

        const user = await User.findOne({ where: { nombre: req.body.nombre } });

        if (user) {
            var token = jwt.sign({ user }, process.env.SECRET_KEY);
        } else if (!user) {
            res.status(404).send("Usuario no encontrado")
        }

        const validPassword = await bcrypt.compare(req.body.contrasegna, user.contrasegna);

        if (validPassword) {
            res.status(200).json('contraseña correcta');
            localStorage.setItem('token', token);
        } else if (!validPassword) {
            res.status(400).json('contraseña incorrecta');
        }

    } catch (err) {
        console.log(err);
    }

}

authController.logout = async (req, res) => {

    try {

        const user = await User.findOne({ where: { nombre: req.body.nombre } });

        if (user) {
            var token = jwt.sign({ user }, process.env.SECRET_KEY);
        } else if (!user) {
            res.status(404).send("Usuario no encontrado")
        }

        const validPassword = await bcrypt.compare(req.body.contrasegna, user.contrasegna);

        if (validPassword) {
            res.status(200).json('Sesion finalizada');
            localStorage.removeItem('token', token);
        } else if (!validPassword) {
            res.status(400).json('contraseña incorrecta');
        }

    } catch (err) {
        console.log(err);
    }

}

authController.get = async (req, res) => {

    const users = await User.findAll();

    res.json(users);

}

module.exports = authController;