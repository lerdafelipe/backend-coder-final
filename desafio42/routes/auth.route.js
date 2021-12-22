//express
const express = require('express');
//Router
const router = express.Router();
//controller for auth
const {logout, isLog, SignUp, LogIn} = require('../controllers/authController');
//dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//mongoose schema
const userSchema = require('../schemas/userSchema');

//serialize the user
passport.serializeUser(function(user, done){
    done(null, user[0].username)
});
//deserialize the user
passport.deserializeUser(function(username, done){
    let usuario = userSchema.findOne({username: username});
    done(null, usuario);
});

//use of method login
passport.use('login', new LocalStrategy({passReqToCallback: true},LogIn));
//use of method signup
passport.use('signup', new LocalStrategy({passReqToCallback: true}, SignUp));
//route to know if the user is logged
router.get('/log', isLog)
//route to logged in an user
router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/error-login'}), (req, res)=>{res.send('Success!')});
//route to signup an user
router.post('/signup', passport.authenticate('signup', {failureRedirect: '/auth/error-signup'}), (req, res)=>{ res.send('Success!') });
//route if the login response is an error
router.get('/error-login', (req, res)=>{ res.send('error de logueo') });
//route if the signup response is an error
router.get('/error-signup', (req, res)=>{ res.send('error de registro')});
//route to destroy the session
router.get('/logout', logout);
//export the module route
module.exports = router;