const { google } = require('googleapis');

async function postToBloggerWithAuth(authClient, { blogId, title, content }) {
  const blogger = google.blogger({ version: 'v3', auth: authClient });

  const res = await blogger.posts.insert({
    blogId,
    requestBody: {
      title,
      content
    }
  });

  console.log(`✅ Post published poster: ${res.data.url}`);
  return res.data;
}

module.exports = { postToBloggerWithAuth };
