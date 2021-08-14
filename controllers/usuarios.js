const { response, request } = require('express');
const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no name', apiKey }  = req.query;

    res.json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apiKey
    })
}

const usuarioPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post Api - controlador',
        nombre,
        edad
    })
}

const usuarioPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put Api - controlador ',
        id
    })
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - controlador '
    })
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}