const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');
// const usuario = require('../models/usuario');

const validarJWT = async (req= request, res= response, next ) => {

    const token = req.header('x-token');

    if (!token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario que corresponda AL UID
        const usuario = await Usuario.findById( uid );

        //Verificar el usuario en la BD
        if ( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe en la base de datos'
            })
        }



        //Verificar el estado del UID
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })        
    }

}

module.exports = {
    validarJWT
}