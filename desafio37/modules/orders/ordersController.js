const orderSchema = require('./orderSchema');
//twilio
const {accountSid, authToken, PHONE_NUMBER, MAIL_OWNER} = require('../../constants');
//gmail
const {transporterG} = require('../../mail/gmail');

const twilio = require('twilio')
const client = twilio(accountSid, authToken);


const getOrders = async (req, res)=>{
    const orders = await orderSchema.find();

    res.json(orders);
};

const getOneOrder = async (req, res)=>{
    const {id} = req.params;

    const order = await orderSchema.findById(id);

    res.json(order);
};

const postOrder = (req, res)=>{
        const order = req.body;
        let author = order.author[0];
        let items = order.items;
        let fragmentMail = '';

        if(req.session.passport.user !== undefined){
            for (let i of items) {
                fragmentMail += `<li>Producto:${i.nombre} - Subtotal $${i.precio}</li>`
                
            }
    
            client.messages.create({
                    body: `Nuevo Pedido de ${author.username}, ${author.email}`,
                    from: `${PHONE_NUMBER}`,
                    to: `${PHONE_NUMBER}`
            })
            .then(message => console.log(message.sid))
            .catch(console.log('err'));
    
            transporterG.sendMail({
                                        from: 'Servidor Node.js',
                                        to: [`${MAIL_OWNER}`],
                                        subject: `Nuevo Pedido de ${author.username}, ${author.email}`,
                                        html: `<h1 style="color: blue;">Nueva compra de ${author.username}</h1>
                                                <ul>
                                                    ${fragmentMail}
                                                </ul>`
            }, (err, info) => {if(err) {console.log(err)}});
    
    
            const newOrder = new orderSchema(order);
            newOrder.save();
        }else{
            res.json({status: 404})
        }
};

const putOrder = async (req, res)=>{
    const {id} = req.params;
    const orderChange = req.body;

    const orderUpdate = await orderSchema.updateOne({_id: id}, {
        $set: {orderChange}
    });

    res.json(orderUpdate);
};

const deleteOrder = async (req, res)=>{
    const {id} = req.params;

    const order = await orderSchema.findOneAndDelete({_id: id});

    res.json({order: order});
};


module.exports = {
    getOrders, 
    getOneOrder, 
    postOrder, 
    putOrder, 
    deleteOrder
};