import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  if (req.method === "POST") {
    const { mol, title } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `return 500 words of unique easy to understand information about ${title} ${mol}\n`,
      temperature: 0.7,
      max_tokens: 600,
    });

    const PromptOutput = completion.data.choices.pop();

    res.status(200).json({ output: PromptOutput });
  }
};

export default generateAction;
