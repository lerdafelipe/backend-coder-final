const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    id: String,
    first_name: String,
    last_name: String,
    picture: Array,
    email: String
}, {versionKey: false});

module.exports = model('users', userSchema);