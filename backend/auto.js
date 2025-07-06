const axios = require("axios");

// Replace this with your own logic to get title, html, image from your DB or queue
const getNextScheduledPost = () => {
  return {
    title: "Scheduled Post: Red Dead Redemption Mods",
    html: `
      <h1>Red Dead Redemption Mods</h1>
      <p>Explore the best RDR mods to enhance your gameplay like RDR2.</p>
    `,
    image: "https://images.unsplash.com/photo-1605414262260-10bcc2860ac8?ixlib=rb-4.1.0&q=80&w=1080"
  };
};

async function autoPost() {
  console.log("⏰ Auto-post task triggered...");

  const postData = getNextScheduledPost();

  try {
    const res = await axios.post("http://localhost:5000/api/publish", postData);
    console.log("✅ Post published at:", res.data.url);
  } catch (err) {
    console.error("❌ Auto-post failed:", err.response?.data?.error || err.message);
  }
}

autoPost();
