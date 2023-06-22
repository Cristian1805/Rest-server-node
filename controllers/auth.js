const { response, json } = require('express');
const bcryptjs  = require('bcryptjs');
const Usuario = require('../models/usuario');


const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT( usuario.id );

        //Validaciones hechas, se crea el login del usuario
        res.json({
            usuario,
            token
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salio mal'
        });
    }

   
}


const googlesignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const googleUser = await googleVerify( id_token );
        console.log(googleUser);

        res.json({
            msg: 'Todo bien - Google SingIn exitoso',
            id_token
        })
        
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        
    }

}


module.exports = {
    login, googlesignIn
}