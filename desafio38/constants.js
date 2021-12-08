//Mongo PASSWORD
const MONGO_ATLAS_PASS = '5';

//Port
const PORT = parseInt(process.argv[2]) || 8080;

//Gmail password
const GMAIL_PASSWORD = '5';

//Facebook secret
const FACEBOOK_CLIENT_ID = 4885;
const FACEBOOK_CLIENT_SECRET = '5';

//PHONE NUMBER
const PHONE_NUMBER = 5;

//mail owner
const MAIL_OWNER = '5';

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