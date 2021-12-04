const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: String,
    username: String,
    direccion: String,
    edad: Number,
    phone: Number,
    avatar: String,
    password: String
}, {versionKey: false});

module.exports = model('users', userSchema);