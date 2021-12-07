const nodemailer = require('nodemailer');

//Constantes
const {ETHEREAL_PASSWORD} = require('../constants');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosamond.cormier45@ethereal.email',
        pass: `${ETHEREAL_PASSWORD}`
    }
});

const mailOptions = (op, us, dat)=>{
    return {
        from: 'Servidor Node.js',
        to: ['rosamond.cormier45@ethereal.email'],
        subject: `${op} del user ${us}, Fecha y hora: ${dat}`,
        html: `<h1 style="color: blue;">El usuario ${us} ha hecho un ${op} en su cuenta</h1>`
    }
};

module.exports={
    transporter,
    mailOptions
};