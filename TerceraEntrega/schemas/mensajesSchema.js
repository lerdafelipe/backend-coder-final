const {Schema, model} = require('mongoose');

const mensajesSchema = new Schema({
    author: String,
    texto: String
}, {versionKey: false});

module.exports = model('mensajes', mensajesSchema);