const express = require('express');
const app = express();
//Routes
const products = require('./routes/productos.route');
const mensajes = require('./routes/mensajes.route');
const orders = require('./routes/orders.route');
//const auth = require('./routes/auth.route');

//Constantes
const {MONGO_ATLAS_PASS, PORT} = require('./constants');

//Function connection database
const Connection = require('./database/Connection');
Connection();

//Compression
const compression = require('compression');
app.use(compression());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mongoStore = require('connect-mongo');
//
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//route auth
//app.use('/auth', auth);

const session = require('express-session');
app.use(session({
    store: mongoStore.create({
        mongoUrl: `mongodb+srv://felipe:${MONGO_ATLAS_PASS}@cluster0.u1fee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions,
        ttl: 3000
    }),
    secret: 'manolito',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));

//Cors
const cors = require('cors');
app.use(cors({ origin: '*' }));

//express extensions
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/productos', products);
app.use('/mensajes', mensajes);
app.use('/orders', orders);

//Passport
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());




////////////////////////
////////////////////////
////////////////////////
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('./schemas/userSchema');

const {transporterG, mailOptionsG} = require('./mail/gmail')


passport.serializeUser(function(user, done){
    done(null, user[0].username)
});
passport.deserializeUser(function(username, done){
    let usuario = userSchema.findOne({username: username});
    done(null, usuario);
});

//
let createHash = (pass)=>{
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(10), null);
}

let isValidPass = (user, pass)=>{
    return bCrypt.compareSync(pass, user.password)
}


passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
async function(req, username, password, done){
        let user = await userSchema.find({username: username});
        if(!user) return done(null, false)
        let success =  user[0].username == username && isValidPass(user[0], password);
        if(!success) return done(null, false)
        return done(null, user);
    })
);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done){
        const createUser = async()=>{
            let userIs = await userSchema.find({username: username});
            if(userIs.length > 0) return done(null, false);
            let user = {username: username, password: createHash(password), email: req.body.email, direccion: req.body.direccion, phone: req.body.phone, edad: req.body.edad, avatar: req.body.avatar};
            const newUser = new userSchema(user);
            await newUser.save();  
            return done(null, [user]);
        }
        transporterG.sendMail(mailOptionsG(req.body), (err, info) => {
            if(err) {console.log(err)}});
        process.nextTick(createUser);
    })
);

app.get('/log', (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res)=>{
    res.json('Success!')
});

app.post('/signup', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res)=>{
    res.json('Success!')
});

app.get('/error-login', (req, res)=>{
    res.send({error: 'error de logueo'});
});

app.get('/error-signup', (req, res)=>{
    res.send({error: 'error de registro'})
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.send('Success!');
});

app.get('/info-user', async(req, res)=>{
    let username = ('req', req.user._conditions);
    let userCome = await userSchema.find(username);
    let user = {email:userCome[0].email, username:userCome[0].username, direccion:userCome[0].direccion, edad:userCome[0].edad, phone:userCome[0].phone, avatar:userCome[0].avatar}
    res.json(user);
});
////////////////////////
///////////////////////
////////////////////////




//Server
const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

//Manejo de error del servidor
server.on('error', error => {
    res.json({ error: -2, descripcion: 'Ruta con método no implementada' }, error);
});