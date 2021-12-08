const productsSchema = require('../schemas/productsSchema');


const getProducts = async (req, res)=>{
    const products = await productsSchema.find();

    return products;
    //res.json(products);
};

const getOneProduct = async (nombre)=>{
    //const {id} = req.params;

    const product = await productsSchema.find({nombre: nombre});

    return product;
    //res.json(product);
};

const postProduct = async (product)=>{
    //const newProduct = new productsSchema(req.body);
    const newProuct = new productsSchema(product);

    let productSave = await newProuct.save();

    return productSave;
    //res.json(productSave);
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
