const mensajesSchema = require('./mensajesSchema');


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