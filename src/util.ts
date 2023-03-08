import readline from "readline";

export const getVersion = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require("../package.json");
  return version;
};

export const prompt = `
Act as a natural language to {shell} command translation engine on {os}.

You are an expert in {shell} on {os} and translate the question at the end to valid syntax.

Follow these rules:
- Construct valid {shell} command that solve the question
- Be concise
- Return only plaintext
- Only show a single answer, but you can always chain commands together
- Think step by step
- Only create valid syntax
- If python is installed you can use it to solve problems
- if python3 is installed you can use it to solve problems
- Even if there is a lack of details, attempt to find the most logical solution by going about it step by step
- Do not return multiple solutions
- Do not show html, styled, colored formatting
- Do not creating invalid syntax
- Do not add unnecessary text in the response
- Do not add notes or intro sentences
- Do not show multiple distinct solutions to the question
- Do not add explanations on what the commands do
- Do not return what the question was
- Do not repeat or paraphrase the question in your response
- Do not cause syntax errors
- Do not rush to a conclusion

Follow all of the above rules. This is important you MUST follow the above rules. There are no exceptions to these rules. You must always follow them. No exceptions.

Question:
`;

export const getPrompt = () => {
  let osName = "Darwin/macOS";
  let shellName = "bash";

  if (process.platform === "win32") {
    osName = "Windows";
    shellName = "powershell";
  } else {
    osName = "Linux";
    shellName = "bash";
  }

  return prompt.replace("{os}", osName).replace("{shell}", shellName);
};

const byNum = (mess: string, fgNum: number) => {
  mess = mess || "";
  fgNum = fgNum === undefined ? 31 : fgNum;
  return `\u001b[${fgNum}m${mess}\u001b[39m`;
};

export const color = {
  black: (mess: string) => byNum(mess, 30),
  red: (mess: string) => byNum(mess, 31),
  green: (mess: string) => byNum(mess, 32),
  yellow: (mess: string) => byNum(mess, 33),
  blue: (mess: string) => byNum(mess, 34),
  magenta: (mess: string) => byNum(mess, 35),
  cyan: (mess: string) => byNum(mess, 36),
  white: (mess: string) => byNum(mess, 37),
} as const;

export const getInput = async (message: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return await new Promise<string>((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};
