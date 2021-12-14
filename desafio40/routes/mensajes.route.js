const express = require('express');
//Router
const router = express.Router();
//Controllers
const {
    getMensajes, 
    getOneMensaje, 
    postMensaje, 
    putMensaje, 
    deleteMensaje
} = require('../controllers/mensajesController');


//Ruta de listar mensaje
router.get('/', getMensajes);

//Ruta de listar un solo mensaje
router.get('/:id', getOneMensaje);

//Ruta post para guardar un mensaje
router.post('/', postMensaje);

//Ruta post para actualizar un mensaje
router.put('/:id', putMensaje);

//Ruta post para borrar un mensaje
router.delete('/:id', deleteMensaje);

module.exports = router;