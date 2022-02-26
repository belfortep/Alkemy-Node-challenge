const Genero = require('../models/Genero');
const generoController = {}

generoController.get = async (req, res) => {

    try {
        const generos = await Genero.findAll();

        res.status(200).json(generos);

    }
    catch {
        res.status(500).json(err);
    }

}
generoController.put = async (req, res) => {

    try {

        await Genero.update({ imagen: req.body.imagen, nombre: req.body.nombre, peliculas_asociadas: req.body.peliculas_asociadas }, { where: { id: req.params.id } });

        res.status(200).json('Genero actualizado');

    } catch (err) {
        res.status(500).json(err);
    }

}
generoController.post = async (req, res) => {

    const newGenero = new Genero(req.body);
    try {
        const savedGenero = await newGenero.save();
        res.status(200).json(savedGenero);
    } catch (err) {
        res.status(500).json(err);
    }

}
generoController.delete = async (req, res) => {

    try {

        await Genero.destroy({ where: { id: req.params.id } });

        res.status(200).json('Genero eliminado');

    } catch (err) {
        res.status(500).json(err);
    }

}


module.exports = generoController