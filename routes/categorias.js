const { Router } = require('express');
const { check } = require('express-validator');

//Validacion de rama en git
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get')
});

//Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get -id')
});


//Crear una categoria - privado - cualquier persona con un token valido
router.post('/', (req, res) => {
    res.json('post');
});


//Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res) => {
    res.json('put');
});


//Crear una categoria - privado - cualquier persona con un token valido
router.delete('/:id', (req, res) => {
    res.json('eliminar por id')
});

module.exports = router;  