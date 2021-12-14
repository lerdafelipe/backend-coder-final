const productsSchema = require('../schemas/productsSchema');


const getProducts = async (req, res)=>{
    const products = await productsSchema.find();

    res.json(products);
};

const getOneProduct = async (req, res)=>{
    const {id} = req.params;
    const product = await productsSchema.find({_id: id});

    res.json(product);
};

const postProduct = async (req, res)=>{
    const newProduct = new productsSchema(req.body);

    let productSave = await newProduct.save();

    res.json(productSave);
};

const putProduct = async (req, res)=>{
    const {id} = req.params;

    const product = await productsSchema.findByIdAndUpdate(id, {
        $set: req.body
    });

    const productUpdate = await productsSchema.find({_id: id});

    res.json(productUpdate[0]);
};

const deleteProduct = async (req, res)=>{
    const {id} = req.params;

    const product =  await productsSchema.findOneAndDelete({_id: id});

    res.json(product)
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
}
