const axios = require('axios');
const { OLLAMA_URL, MODEL } = require('../config');

async function generateFromOllama(title, prompt) {
    const fullPrompt = `#${title}\n\n${prompt}`;
    const res = await axios.post(OLLAMA_URL,{
        model: MODEL,
        prompt: fullPrompt,
        stream: false
    });

    return res.data.response;
}

module.exports = {generateFromOllama};

