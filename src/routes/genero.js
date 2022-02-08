const Genero = require('../models/Genero');
const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();

//CREAR GENERO

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

router.put('/:id', verifyToken, async (req, res) => {
    try {

        await Genero.update({ imagen: req.body.imagen, nombre: req.body.nombre, peliculas_asociadas: req.body.peliculas_asociadas }, { where: { id: req.params.id } });

        res.status(200).json('Genero actualizado');

    } catch (err) {
        res.status(500).json(err);
    }

})

//DELETE GENERO
router.delete('/:id', verifyToken, async (req, res) => {
    try {

        await Genero.destroy({ where: { id: req.params.id } });

        res.status(200).json('Genero eliminado');

    } catch (err) {
        res.status(500).json(err);
    }

})



//GET TODOS GENEROS

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