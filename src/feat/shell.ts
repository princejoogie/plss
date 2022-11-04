import { openai } from "../config";

export const shell = async (query: string) => {
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
