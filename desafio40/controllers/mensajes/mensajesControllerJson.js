const fs = require('fs');

//Function to get all messages
const getMensajes = async (req, res)=>{
    try {
        const objs = await fs.readFile('../DB/mensajes.json', 'utf-8');
        res.json(JSON.parse(objs));
        return JSON.parse(objs);
    } catch (error) {
        res.json([]);
        return [];
    }
};

//Function to get only one message
const getOneMensaje = async (req, res)=>{
    const mensajes = getMensajes();
    //We get the id of the params and we search a document in the collection messages with that id
    const {id} = req.params;
    const mensaje = mensajes.find(o => o._id === id);
    //return the message finded
    res.json(mensaje);
};

//Funtion to upload a message
const postMensaje = async (req, res)=>{
    let mensajes = getMensajes();
    //Gets the message of the body
    let newId
    if (mensajes.length == 0) {newId = 1} 
    else {newId = mensajes[mensajes.length - 1]._id + 1}
    const newMensaje = {...req.body, _id: newId}
    mensajes.push(newMensaje);
    try {
        await fs.writeFile('../DB/mensajes.json', JSON.stringify(mensajes, null, 2));
        res.json(newMensaje);
    } catch (error) {
        throw new Error(`Error al guardar: ${error}`);
    }
};

//Funtion to update one message
const putMensaje = async (req, res)=>{
    let mensajes = getMensajes();
    //Gets the id and the changes from req.
    const {id} = req.params;
    const index = mensajes.findIndex(o => o._id == id);
    if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) } 
    else {
        mensajes[index] = req.body;
        try {
            await fs.writeFile('../DB/mensajes.json', JSON.stringify(mensajes, null, 2))
            res.json(mensajes[index]);
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }
    
};

//Funtion to delete on e message
const deleteMensaje = async (req, res)=>{
    let mensajes = getMensajes();
    //Gets the id of the message to delete
    const {id} = req.params;
    //Deletes the message
    const index = mensajes.findIndex(o => o._id == id)
    if (index == -1) {
        throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }else{
        mensajes.filter(p => p._id !== id);
        try {
            await fs.writeFile('../DB/mensajes.json', JSON.stringify(mensajes, null, 2))
            res.json({state: 'Message deleted'});
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
};


module.exports = {getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje};