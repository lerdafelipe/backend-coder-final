const mensajesSchema = require('../schemas/mensajesSchema');
//twilio
const accountSid = 'AC0b439be5828c1a88f32b7125b0e73685';
const authToken = '9de493a9f76c17c32ce083db53cf7512';

const twilio = require('twilio')
const client = twilio(accountSid, authToken);


const getMensajes = async (req, res)=>{
    const mensaje = await mensajesSchema.find();

    res.json(mensaje);
};

const getOneMensaje = async (req, res)=>{
    const {id} = req.params;

    const mensaje = await mensajesSchema.findById(id);

    res.json(mensaje);
};

const postMensaje = async (req, res)=>{
    const mensaje = req.body;

    if(mensaje.texto.toLowerCase().includes('administrador')){
        client.messages.create({
            body: `Mensaje: ${mensaje.texto}, Autor: ${mensaje.author}`,
            from: 'number',
            to: 'anotherNumber'
      })
      .then(message => console.log(message.sid))
      .catch(console.log);
    }

    const newMensaje = new mensajesSchema(mensaje);
    await newMensaje.save();
};

const putMensaje = async (req, res)=>{
    const {id} = req.params;
    const mensajeChange = req.body;

    const mensajeUpdate = await mensajesSchema.updateOne({_id: id}, {
        $set: {mensajeChange}
    });

    res.json(mensajeUpdate);
};

const deleteMensaje = async (req, res)=>{
    const {id} = req.params;

    const mensaje = await mensajesSchema.findOneAndDelete({_id: id});

    res.json({mensaje: mensaje});
};


module.exports = {
    getMensajes, 
    getOneMensaje, 
    postMensaje, 
    putMensaje, 
    deleteMensaje
};