const { response } = require('express');
const bcryptjs  = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res = response ) => {

    const {correo, password } = req.body;


    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }


        //Verificar si el usuario esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - estado: false'
            });
        }


        //Verificar la contraseña
        const validarContraseña = bcryptjs.compareSync(password, usuario.password);
        if (!validarContraseña){
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - password'
            });
        } 

        //Generar el JWT

        //Validaciones hechas, se crea el login del usuario
        res.json({
            msg: 'Login ok'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }

   
}


module.exports = {
    login
}