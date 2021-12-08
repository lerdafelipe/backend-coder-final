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
} = require('../controllers/productsController');



const { graphqlHTTP }  = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
//https://graphql.org/graphql-js/basic-types/
var schema = buildSchema(`
    type Query {
        product: [Productos],
        products: [Productos],
    },
    type Mutation {
        postProduct(nombre: String,categoria: String!,stock: Int!, precio: Int!): Productos
    },
    type Productos {
        nombre: String,
        categoria: String,
        stock: Int,
        precio: Int,
        id: String
    }    
`);



// Root resolver
var root = {
    product: getOneProduct,
    products: getProducts,
    newproduct: postProduct
};


router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


//Ruta de listar productos
//router.get('/', getProducts);

//Ruta de listar un solo producto
//router.get('/:id', getOneProduct);

//Ruta post para guardar un product
//router.post('/', postProduct);

//Ruta post para actualizar un product
router.put('/:id', putProduct);

//Ruta post para borrar un product
router.delete('/:id', deleteProduct);

module.exports = router;