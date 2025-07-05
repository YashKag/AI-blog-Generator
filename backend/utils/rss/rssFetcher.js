const Parser = require("rss-parser");
const parser = new Parser();

const RSS_FEED = [
    "https://www.theverge.com/rss/index.xml",
    "https://gamerant.com/feed/"
]

async function getRssTitles(limit=5) {
    const allArticle = [];

    for (const url of RSS_FEED) {
        try {
            const feed = await parser.parseURL(url); 


            const articles = feed.items.slice(0,limit).map(item=>({
                title:item.title,
                category:item.categories,
                image: item.enclosure?.url || null,
                content: item['content:encoded'] || item.content || '',
                description: item.contentSnippet,
            }));

            allArticle.push(...articles);

        } catch (error) {
            console.log(`RSS fetch error for ${url}`, error.message);
        }
    }
    return allArticle;
}

module.exports = { getRssTitles }   