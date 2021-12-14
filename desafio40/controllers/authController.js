const userSchema = require('../schemas/userSchema');
const {transporterG, mailOptionsG} = require('../mail/gmail');
const bCrypt = require('bcrypt');

let createHash = (pass)=>{
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(10), null);
}

const logout = (req, res)=>{
    req.logout();
    res.send('Success!');
}

const isLog = (req, res)=>{
    if (req.isAuthenticated()){
        res.json({log: true})
    }else res.json({log: false})
}

const SignUp = (req, username, password, done) => {
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
}

const LogIn = async (req, username, password, done) => {
    let user = await userSchema.find({username: username});
    if(!user) return done(null, false)
    let success =  user[0].username == username && user[0].password == password;
    if(!success) return done(null, false)
    return done(null, user);
}


module.exports = {
    logout,
    isLog,
    SignUp,
    LogIn
}