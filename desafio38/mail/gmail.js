const nodemailer = require('nodemailer');

//Constantes
const {GMAIL_PASSWORD, MAIL_OWNER} = require('../constants');

const transporterG = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'felipelerdad@gmail.com',
        pass: `${GMAIL_PASSWORD}`
    }
});

const mailOptionsG = (user)=>{
    return {
        from: 'Servidor Node.js',
        to: [`${MAIL_OWNER}`],
        subject: `Nuevo registro`,
        html: `<h1 style="color: blue;">Datos nuevo usuario</h1>
                <ul>
                    <li>email:${user.email}</li>
                    <li>phone:${user.phone}</li>
                    <li>username:${user.username}</li>
                    <li>direccion:${user.direccion}</li>
                </ul>`
    }
};

module.exports={
    transporterG,
    mailOptionsG
};