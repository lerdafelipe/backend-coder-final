const express = require('express');
//Router
const router = express.Router();
//Controllers
const {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
} = require('./productsController');


//Ruta de listar productos
router.get('/', getProducts);

//Ruta de listar un solo producto
router.get('/:id', getOneProduct);

//Ruta post para guardar un product
router.post('/', postProduct);

//Ruta post para actualizar un product
router.put('/:id', putProduct);

//Ruta post para borrar un product
router.delete('/:id', deleteProduct);

module.exports = router;