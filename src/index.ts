import { execSync } from "child_process";
import { getPrompt, getVersion, color, getInput } from "./util";
import { openai } from "./config";

const main = async () => {
  if (!process.env["OPENAI_APIKEY"]) {
    console.error("OPENAI_APIKEY environment not set");
    process.exit(1);
  }

  if (process.argv[2] === "--help") {
    console.log("pls <query>");
    process.exit(0);
  } else if (process.argv[2] === "--version") {
    console.log(`v${getVersion()}`);
    process.exit(0);
  } else if (process.argv.length <= 2) {
    console.error("No query provided");
    process.exit(1);
  }

  const query = process.argv.slice(2).join(" ");
  const command = await generateCommand(query);
  console.log(color.blue(`Command: ${command}`));

  const choice = await getInput("Execute? (y/N) ");
  if (choice.toLowerCase() !== "y") {
    process.exit(0);
  }
  execSync(command, { stdio: "inherit" });
};

const generateCommand = async (query: string) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: getPrompt() },
      { role: "user", content: query },
    ],
    temperature: 0,
    max_tokens: 150,
  });

  if (response.data.choices.length <= 0) {
    console.error("No choices returned");
    process.exit(1);
  }

  if (!response.data.choices[0]?.message?.content) {
    console.error("No output returned");
    process.exit(1);
  }

  return response.data.choices[0].message.content;
};

main().catch(() => {
  console.error("An error occurred");
  process.exit(1);
});
