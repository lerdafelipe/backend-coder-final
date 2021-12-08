const productsSchema = require('../schemas/productsSchema');


const getProducts = async (req, res)=>{
    const products = await productsSchema.find();

    res.json(products);
};

const getOneProduct = async (req, res)=>{
    const {id} = req.params;

    const product = await productsSchema.findById(id);

    res.json(product);
};

const postProduct = async (req, res)=>{
    const newProduct = new productsSchema(req.body);
    let productSave = await newProduct.save();

    res.json(productSave);
};

const putProduct = async (req, res)=>{
    const {id} = req.params;

    const productUpdate = await productsSchema.updateOne({_id: id}, {
        $set: req.body
    });

    res.json(productUpdate);
};

const deleteProduct = async (req, res)=>{
    const {id} = req.params;

    const product = await productsSchema.findOneAndDelete({_id: id});

    res.json({product: product})
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
}


var express = require('express');
var { graphqlHTTP }  = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
//https://graphql.org/graphql-js/basic-types/
var schema = buildSchema(`
    type Query {
        products: [Productos],
        products: [Productos],
    },
    type Mutation {
        postProduct(id: Int!, nombre: String,categoria: String!,stock: Number!, precio: Number!): Product
    },
    type Productos {
        nombre: String,
        categoria: String,
        stock: Number,
        precio: Number
    }    
`);



// Root resolver
var root = {
    product: getOneProduct,
    products: getProducts,
    postProduct: postProduct
};


router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));