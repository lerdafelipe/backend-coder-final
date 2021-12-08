const express = require('express');
const app = express();
//Routes
const products = require('./routes/productos.route');
const mensajes = require('./routes/mensajes.route');
const info = require('./routes/info.route');
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
app.use('/info', info);
app.use('/mensajes', mensajes);

//Passport
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

////////////////////
///////////////////
///////////////////


const userSchema = require('./schemas/userSchema');

//transporter
const {
    transporter,
    mailOptions
} = require('./mail/mail');

//transporter Gmail
const {
    transporterG,
    mailOptionsG
} = require('./mail/gmail');


const FacebookStrategy = require('passport-facebook').Strategy;

//Constants
const {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET} = require('./constants');


passport.serializeUser(function (user, done) {
    done(null, user._id)
});
passport.deserializeUser(async function (_id, done) {
    const user = userSchema.findById(_id);
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email'],
    scope: ['email']
},
(accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        console.log(profile);
      userSchema.findOne({id: profile.id}, (err, user) => {
        
        if (err){ 
            console.log('err', err)
            return done(err)
        }
        if (user){ 
            console.log('user', user)
            return done(null, user)
        }
        else {
          let newUser = new userSchema(profile._json)
          //newUser.provider = 'facebook';
          console.log('newUser', newUser);

          newUser.save((err) => {
            if(err) throw err
            return done(null, newUser)
          })
        }
      })
    })
  })
);

app.get('/log', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ log: true })
    } else res.json({ log: false })
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/fail-login'
})
);

app.get('/auth/success', (req, res)=>{    
    res.send('okk');
    
});

app.get('/fail-login', (req, res) => {
    res.send('error de logueo')
});

app.get('/auth/logout', (req, res) => {
    let date = new Date;
    transporter.sendMail(mailOptions('deslogueo', req.user.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info)
    });
    req.logout();
    res.send('Success!');
});

app.get('/info-user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    }
});



//////////////////
//////////////////
/////////////////









//Server
const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

//Manejo de error del servidor
server.on('error', error => {
    res.json({ error: -2, descripcion: 'Ruta con método con implementada' }, error);
});