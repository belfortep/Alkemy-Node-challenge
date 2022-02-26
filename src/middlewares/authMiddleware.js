const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch')

//VERIFICA TOKEN SEGURIDAD EN LOCALSTORAGE

dotenv.config();
const verifyToken = (req, res, next) => {

    const token = localStorage.getItem('token')
    console.log(token);

    if (token) {

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {

            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                console.log(decodedToken);
                next();
            }

        })

    }
    else {
        res.sendStatus(403);

    }

}


module.exports = verifyToken