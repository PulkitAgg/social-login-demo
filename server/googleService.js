const { google } = require('googleapis');
const https = require('https');

const googleConfig = {
    clientId: process.env.googleClientId,
    clientSecret: process.env.googleSecretKey,
    redirect: 'http://localhost:3000/google-auth' // this must match your google api settingss
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

/**
* This scope tells google what information we want to request.
*/
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}

async function getToken(code) {
    return new Promise(async (res, rej) => {
        try {
            const auth = createConnection(); 
            const {tokens} = await auth.getToken(code);
            auth.setCredentials(tokens);
            https.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
              data += chunk;
            });
            resp.on('end', () => {
              console.log('data------->',JSON.parse(data));
              res(JSON.parse(data));
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
            rej(err);
          });
        } catch(err) {
            console.log('err---->', err);
            rej(err);
        }
    })
}

module.exports = {
    urlGoogle,
    getToken
}