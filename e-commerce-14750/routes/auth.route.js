//express
const express = require('express');
//Router
const router = express.Router();
//
const userSchema = require('../schemas/userSchema');

//transporter
const {
    transporter,
    mailOptions
} = require('../mail/mail');

//transporter Gmail
const {
    transporterG,
    mailOptionsG
} = require('../mail/gmail');

//
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

//Constants
const {FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET} = require('../constants');


passport.serializeUser(function (user, done) {
    done(null, user.id)
});
passport.deserializeUser(async function (id, done) {
    const user = users.findById(id);
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
      userSchema.findOne({provider_id: profile.id}, (err, user) => {
        if (err) return done(err)
        if (user) return done(null, user)
        else {
          let newUser = new userSchema(profile._json)
          newUser.provider = 'facebook'

          newUser.save((err) => {
            if(err) throw err
            return done(null, newUser)
          })
        }
      })
    })
  })
);

router.get('/log', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ log: true })
    } else res.json({ log: false })
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/fail-login'
})
);

router.get('/success', (req, res)=>{    
    let date = new Date;
    //Ethereal email
    transporter.sendMail(mailOptions('logueo', req.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    });
    //Gmail
    transporter.sendMail(mailOptions(req.user.email,'logueo', req.user.first_name, date), (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    });
});

router.get('/fail-login', (req, res) => {
    res.send('error de logueo')
});

router.get('/logout', (req, res) => {
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

router.get('/info-user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    }
});

module.exports = router;