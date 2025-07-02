const readline = require('readline-sync');
const { chooseTitle, fetchRedditPost } = require('./utils/titleFetcher');
const { generateFromOllama } = require('./utils/ollamaClient');
const { saveToFile } = require('./utils/fileWriter');
const { buildPrompt } = require('./utils/promptBuilder');
const { loadAuthClient } = require('./auth/googleAuth');
const { postToBloggerWithAuth } = require('./utils/bloggerPoster');
const { generateTitleWithOllama } = require('./utils/generateTitleWithOllama');

const BLOG_ID = '327416300153417893'; // ✅ your blog ID

// ✅ Define CLI function
async function runCLI() {
  const titleObj = await chooseTitle();
  let postContent = '', commentText = '';

  if (titleObj.permalink) {
    const redditData = await fetchRedditPost(titleObj.permalink);
    postContent = redditData.content;
    commentText = redditData.comments;
  }

  const customPrompt = readline.question('\nEnter custom instruction for the AI (or leave blank for default):\n');

  const prompt = buildPrompt({
    title: titleObj.title,
    postContent,
    comments: commentText,
    customPrompt
  });

  const content = await generateFromOllama(titleObj.title, prompt);

  // Save as file
  saveToFile(titleObj.title, content);

  // Ask to post to Blogger
  const postNow = readline.question('Do you want to post this to Blogger? (y/n): ');
  if (postNow.toLowerCase() === 'y') {
    loadAuthClient(async (authClient) => {
      await postToBloggerWithAuth(authClient, {
        blogId: BLOG_ID,
        title: titleObj.title,
        content
      });
    });
  }
}

// ✅ Run only if file is executed directly
if (require.main === module) {
  runCLI();
}

// ✅ Export for use in other modules (like test or API)
module.exports = { runCLI };
