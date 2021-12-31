let getProducts
let getOneProduct
let postProduct
let putProduct
let deleteProduct

switch (process.env.PERS) {
    case 'json':
        getProducts = require('./products/productsControllerMongo').getProducts;
        getOneProduct = require('./products/productsControllerMongo').getOneProduct;
        postProduct = require('./products/productsControllerMongo').postProduct;
        putProduct = require('./products/productsControllerMongo').putProduct;
        deleteProduct = require('./products/productsControllerMongo').deleteProduct;

        break

    /*case 'mongodb':
        getProducts = require('./products/productsControllerMongo').getProducts;
        getOneProduct = require('./products/productsControllerMongo').getOneProduct;
        postProduct = require('./products/productsControllerMongo').postProduct;
        putProduct = require('./products/productsControllerMongo').putProduct;
        deleteProduct = require('./products/productsControllerMongo').deleteProduct;

        break
    case 'memory':
        const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMem.js')
        const { default: CarritosDaoMem } = await import('./carritos/CarritosDaoMem.js')

        productosDao = new ProductosDaoMem()
        carritosDao = new CarritosDaoMem()
        break*/
    default:
        getProducts = require('./products/productsControllerMongo').getProducts;
        getOneProduct = require('./products/productsControllerMongo').getOneProduct;
        postProduct = require('./products/productsControllerMongo').postProduct;
        putProduct = require('./products/productsControllerMongo').putProduct;
        deleteProduct = require('./products/productsControllerMongo').deleteProduct;

        break
}

module.exports = { getProducts, getOneProduct, postProduct, putProduct, deleteProduct }