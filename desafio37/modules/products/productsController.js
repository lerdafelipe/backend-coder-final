const productsSchema = require('./productsSchema');


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