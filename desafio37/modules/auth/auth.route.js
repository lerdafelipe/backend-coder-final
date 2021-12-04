//express
const express = require('express');
//Router
const router = express.Router();
//
const passport = require('passport');
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../users/userSchema');

const {transporterG, mailOptionsG} = require('../../mail/gmail')


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


passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
async function(req, username, password, done){
        let user = await userSchema.find({username: username});
        if(!user) return done(null, false)
        let success =  user[0].username == username && user[0].password == password;
        if(!success) return done(null, false)
        return done(null, user);
    })
);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function(req, username, password, done){
        console.log('Hola')
        const createUser = async()=>{
            let userIs = await userSchema.find({username: username});
            if(userIs.length > 0) return done(null, false);
            let user = {username: username, password: createHash(password), email: req.body.email, direccion: req.body.direccion, phone: req.body.phone, edad: req.body.edad, avatar: req.body.avatar};
            const newUser = new userSchema(user);
            await newUser.save((err)=>console.log(err));  
            console.log('Ok');
            return done(null, [user]);
        }
        transporterG.sendMail(mailOptionsG(req.body), (err, info) => {
            if(err) {return err}});
        process.nextTick(createUser);
    })
);

router.get('/log', (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/error-login'}), (req, res)=>{
    res.send('Success!')
});

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/auth/error-signup'}), (req, res)=>{
    res.send('Success!')
});

router.get('/error-login', (req, res)=>{
    res.send('error de logueo')
});

router.get('/error-signup', (req, res)=>{
    res.send('error de registro')
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.send('Success!');
});

module.exports = router;