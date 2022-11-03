import "dotenv/config";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"] ?? "",
});

const openai = new OpenAIApi(config);

const main = async () => {
  const query = process.argv[2];
  if (!query) {
    console.error("Please provide a query");
    process.exit(1);
  }

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Convert this text to a shell command:\n\nExample: ${query}\nOutput: `,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
  });

  if (response.data.choices.length <= 0) {
    console.error("No choices returned");
    process.exit(1);
  }

  if (!response.data.choices[0]?.text) {
    console.error("No text returned");
    process.exit(1);
  }

  console.log(response.data.choices[0].text.trim());
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
