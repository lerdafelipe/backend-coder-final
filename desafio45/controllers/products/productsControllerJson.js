const productsSchema = require('../../schemas/productsSchema');
const fs = require('fs');

//Function to get all products
const getProducts = async (req, res)=>{
    try {
        const objs = await fs.readFile('../DB/products.js', 'utf-8');
        res.json(JSON.parse(objs));
        return JSON.parse(objs);
    } catch (error) {
        res.json([]);
        return JSON.parse([]);
    }
};

//Function to get only one product
const getOneProduct = async (req, res)=>{
    //We get the id of the params and we search a document in the collection products with that id
    const {id} = req.params;
    const objs = await fs.readFile('../DB/products.json', 'utf-8');
    const products = JSON.parse(objs);
    const product = products.find(o => o.id == id);
    //return the product finded
    res.json(product);
};

//Funtion to upload a product
const postProduct = async (req, res)=>{
    //Set the product an save it in the DB
    let products = getProducts();
    let newId
    if (products.length == 0) {newId = 1} 
    else {newId = products[products.length - 1].id + 1}
    const newProduct = {...req.body, _id: newId}
    products.push(newProduct);
    try {
        await fs.writeFile('../DB/products.json', JSON.stringify(products, null, 2));
        res.json(newProduct);
    } catch (error) {
        throw new Error(`Error al guardar: ${error}`);
    }
};

//Funtion to update one product
const putProduct = async (req, res)=>{
    let products = getProducts();
    //Gets the id and the changes from req.
    const {id} = req.params;
    const index = objs.findIndex(o => o.id == elem.id);
    if (index == -1) { throw new Error(`Error al actualizar: no se encontrĂ³ el id ${id}`) } 
    else {
        products[index] = req.body
        try {
            await fs.writeFile('../DB/products.json', JSON.stringify(products, null, 2))
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }
};

//Funtion to delete one product
const deleteProduct = async (req, res)=>{
    let products = getProducts();
    //Gets the id of the product to delete
    const {id} = req.params;

    const index = products.findIndex(o => o.id == id)
    if (index == -1) {
        throw new Error(`Error al borrar: no se encontrĂ³ el id ${id}`)
    }else{
        products.filter(p => p.id !== id);
        try {
            await fs.writeFile('../DB/products.json', JSON.stringify(products, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    //Returns the product deleted
    res.json(product);
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
};