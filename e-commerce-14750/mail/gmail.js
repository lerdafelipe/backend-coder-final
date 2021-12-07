const nodemailer = require('nodemailer');

//Constantes
const {GMAIL_PASSWORD} = require('../constants');

const transporterG = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'example@gmail.com',
        pass: `${GMAIL_PASSWORD}`
    }
});

const mailOptionsG = (mail ,op, us, dat)=>{
    return {
        from: 'Servidor Node.js',
        to: [`${mail}`,'rosamond.cormier45@ethereal.email'],
        subject: `${op} del user ${us}, Fecha y hora: ${dat}`,
        html: `<h1 style="color: blue;">El usuario ${us} ha hecho un ${op} en su cuenta</h1>`
    }
};

module.exports={
    transporterG,
    mailOptionsG
};