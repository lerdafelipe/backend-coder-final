//express
const express = require('express');
//Router
const router = express.Router();
//
const {logout, isLog, SignUp, LogIn} = require('../controllers/authController');
//
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../schemas/userSchema');


passport.serializeUser(function(user, done){
    done(null, user[0].username)
});
passport.deserializeUser(function(username, done){
    let usuario = userSchema.findOne({username: username});
    done(null, usuario);
});


passport.use('login', new LocalStrategy({passReqToCallback: true},LogIn));

passport.use('signup', new LocalStrategy({passReqToCallback: true}, SignUp));

router.get('/log', isLog)

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/error-login'}), (req, res)=>{res.send('Success!')});

router.post('/signup', passport.authenticate('signup', {failureRedirect: '/auth/error-signup'}), (req, res)=>{ res.send('Success!') });

router.get('/error-login', (req, res)=>{ res.send('error de logueo') });

router.get('/error-signup', (req, res)=>{ res.send('error de registro')});

router.get('/logout', logout);

module.exports = router;