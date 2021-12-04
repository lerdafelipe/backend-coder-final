const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    items: Array,
    author: Array
}, {versionKey: false});

module.exports = model('orders', orderSchema);