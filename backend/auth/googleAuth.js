const { google } = require('googleapis');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/blogger'];
const TOKEN_PATH = 'token.json';

async function authenticate() {
  try {
    const credentials = JSON.parse(fs.readFileSync('credentials.json'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
      oAuth2Client.setCredentials(token);
      return oAuth2Client;
    }

    // Get new token if not exists
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve, reject) => {
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            console.error('Error retrieving access token', err);
            return reject(err);
          }
          oAuth2Client.setCredentials(token);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
          resolve(oAuth2Client);
        });
      });
    });
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

module.exports = authenticate;