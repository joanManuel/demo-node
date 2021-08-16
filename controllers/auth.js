const {response} = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    
    try{
        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo'
            })
        }
        //verificar si usuario activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado: false'
            })
        }
        //Verificar la constraseña        // compara psw q recibe - psw de bd
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password'
            })
        }
        //Generar JWT
        const token = await generarJWT( usuario.id );


        res.json({
            msg: 'Login ok',
            token
        })
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}
module.exports = {
    login
};