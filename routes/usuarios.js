const { check } = require("express-validator");
const { Router } = require('express');

const {esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");
const { usuariosGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete } = require("../controllers/usuarios");
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole } = require("../middlewares");


const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    // check('rol').custom( (rol) => esRoleValido(rol) ), // LO MISMO
    validarCampos
], usuarioPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuarioDelete);

module.exports = router;
