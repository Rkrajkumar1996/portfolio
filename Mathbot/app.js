const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from the .env file

const app = express();
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY; // Access the API key from process.env

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (isMathProblem(message)) {
      const botResponse = await getBotResponse(message, apiKey);
      res.json({ message: botResponse });
    } else {
      res.json({ message: "Sorry, I am only able to solve math problems." });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Oops! Something went wrong.' });
  }
});

function isMathProblem(message) {
  // Regular expression to match math expressions
  const mathRegex = /(^[\d+\-*/\s()^,]*$)|(sin|cos|tan|cot|sec|csc)/i;

  // Check if the message contains any math expressions
  return mathRegex.test(message);
}

async function getBotResponse(userMessage, apiKey) {
  const openaiInstance = new openai.OpenAI(apiKey);

  const prompt = `You are a helpful math bot.\n\nYou: ${userMessage}\nBot:`;

  const response = await openaiInstance.completions.create({
    engine: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim();
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
