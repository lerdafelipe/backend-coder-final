const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    nombre: String,
    categoria: String,
    stock: Number,
    precio: Number
}, {versionKey: false});

module.exports = model('productos', productSchema);