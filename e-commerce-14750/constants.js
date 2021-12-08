//Mongo PASSWORD
const MONGO_ATLAS_PASS = 'Mongo.2049';

//Port
const PORT = parseInt(process.argv[2]) || 8080;

//Gmail password
const GMAIL_PASSWORD = '';

//Facebook secret
const FACEBOOK_CLIENT_ID = 488261922526306;
const FACEBOOK_CLIENT_SECRET = '19f06b75faed5ef46c93c820250374d0';

//PHONE NUMBER
const PHONE_NUMBER = +543534279005;

//mail owner
const MAIL_OWNER = 'lerdafelipe@gmail.com';

//Twilio
const accountSid = 'AC0b439be5828c1a88f32b7125b0e73685';
const authToken = '9de493a9f76c17c32ce083db53cf7512';

module.exports = {
    MONGO_ATLAS_PASS,
    PORT,
    GMAIL_PASSWORD,
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
    PHONE_NUMBER,
    MAIL_OWNER,
    accountSid,
    authToken
}