
const { Router } = require('express');
const { check } = require('express-validator');


const { 
    validarCampos,
    validarJWT,
    esAdminRole
} = require ('../middlewares/index')
 
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), 
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener minimo 6 caracteres').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRolValido ),
    validarCampos 
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ), 
    validarCampos
], usuariosDelete ); 

router.patch('/', usuariosPatch );







module.exports = router;