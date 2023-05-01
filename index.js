const OpenAi = require('openai');
const { Configuration, OpenAIApi } = OpenAi;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OpenAIApiKey = process.env.OPENAI_API_KEY;
const OpenAIApiOrg = process.env.OPENAI_API_ORG;
// console.log(OpenAIApiKey);
// console.log(OpenAIApiOrg);

const configuration = new Configuration({
    // organization: process.env.OPENAI_API_ORG,
    // apiKey: process.env.OPENAI_API_KEY,
    organization: OpenAIApiOrg,
    apiKey: OpenAIApiKey,
});
const openai = new OpenAIApi(configuration);

  // Handler for POST requests to the root route
app.post('/', async (req, res) => {
  const {message} = req.body;

  const prompts = [
    'Slippery roads skids. Can you help summarize rules?',
    'Summarize the rules for passing other vehicles safely on a two-lane road',
    'Explain the proper procedure for making a U-turn on a two-way street.',
    'What should you do if your brakes fail while driving?',
    'Describe the steps you should take when approaching a railroad crossing.',
    'How should you react when you see emergency vehicles with flashing lights?',
    'What is the proper way to merge onto a highway from an on-ramp?',
    'List the rules for driving in a roundabout.',
    'What should you do if your vehicle starts to skid on a slippery road?',
    'Explain the procedure for making a left turn at an intersection.',
    'What are the rules for driving in school zones?'
  ];

  const prompt = prompts[Math.floor(Math.random() * prompts.length)];

  // process the message and generate a response
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ` ${message}`,
    max_tokens: 100,
    temperature: 0,
  });
  if(response.data.choices[0].text){
    res.json({message: response.data.choices[0].text});
  }

});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
