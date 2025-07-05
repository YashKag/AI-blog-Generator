const { getRssTitles } = require('./rssFetcher'); 

( async () => {
  const titles = await getRssTitles(5);
  console.log('titles', titles)
})();