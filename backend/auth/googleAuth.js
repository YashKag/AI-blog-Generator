const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/blogger'];
const TOKEN_PATH = 'token.json';

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
  } else {
    getNewToken(oAuth2Client, callback);
  }
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('👉 Visit this URL to authorize:\n', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('\n🔑 Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code).then(({ tokens }) => {
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
      console.log('✅ Token saved to', TOKEN_PATH);
      callback(oAuth2Client);
    }).catch(err => {
      console.error('❌ Failed to get token:', err.message);
    });
  });
}

function loadAuthClient(callback) {
  const credentials = JSON.parse(fs.readFileSync('credentials.json'));
  authorize(credentials, callback);
}

module.exports = { loadAuthClient }; // this is key!
