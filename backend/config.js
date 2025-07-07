require('dotenv').config();

module.exports = {
  OLLAMA_URL:'http://host.docker.internal:11434/api/generate',
  MODEL: 'llama3:latest',
};