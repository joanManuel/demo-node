const jwt = require('jsonwebtoken');
const {response, request} = require("express");
const Usuario = require('../models/usuario');
const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')
    if(!token) {
        res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario) {
            res.status(401).json({
                msg: 'Token no válido -  usuario no existe en BD'
            })
        }

        //verificar si el usuario tiene el estado en true
        if(!usuario.estado){
            res.status(401).json({
                msg: 'Token no válido -  usuario con estado: false'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}