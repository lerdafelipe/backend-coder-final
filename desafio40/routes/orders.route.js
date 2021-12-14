const express = require('express');
//Router
const router = express.Router();
//Controllers
const {
    getOrders, 
    getOneOrder, 
    postOrder, 
    putOrder, 
    deleteOrder
} = require('../controllers/ordersController');


//Ruta de listar ordenes
router.get('/', getOrders);

//Ruta de listar 1 orden
router.get('/:id', getOneOrder);

//Ruta post para guardar una orden
router.post('/', postOrder);

//Ruta post para actualizar una orden
router.put('/:id', putOrder);

//Ruta post para borrar una orden
router.delete('/:id', deleteOrder);

module.exports = router;