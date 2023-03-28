#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";
import { getPrompt, getVersion, color, getInput } from "./util";
import { openai } from "./config";

const main = async () => {
  if (!process.env["OPENAI_APIKEY"]) {
    console.error("OPENAI_APIKEY environment not set");
    process.exit(1);
  }

  if (process.argv[2] === "--help") {
    console.log("plss <query>\nplss subs <mp4_file>");
    process.exit(0);
  } else if (process.argv[2] === "--version") {
    console.log(`v${getVersion()}`);
    process.exit(0);
  } else if (process.argv[2] === "transcribe") {
    const initialPath = process.argv[3];
    if (!initialPath) {
      console.log("No file specified.");
      process.exit(1);
    }

    const lastDotPos = initialPath.lastIndexOf(".");
    const name = initialPath.slice(0, lastDotPos);
    const ext = initialPath.slice(lastDotPos + 1);

    const validExtensions = [
      "mp3",
      "mp4",
      "mpeg",
      "mpga",
      "m4a",
      "wav",
      "webm",
    ];

    if (ext && !validExtensions.includes(ext)) {
      console.log("Invalid file extension provided.");
      console.log("Valid extensions: ", validExtensions.join(", "));
      process.exit(1);
    } else if (!ext || !name) {
      console.log("Invalid file provided.");
      process.exit(1);
    }

    let format = process.argv[4];
    const validFormats = ["srt", "json", "text", "verbose_json", "vtt"];

    if (format && !validFormats.includes(format)) {
      console.log("Invalid format provided.");
      console.log("Valid formats: ", validFormats.join(", "));
      process.exit(1);
    } else if (!format) {
      format = "text";
    }

    console.log("Generating subs...");
    const response = await openai.createTranscription(
      fs.createReadStream(initialPath),
      "whisper-1",
      undefined,
      format
    );

    if (response.data) {
      if (format === "verbose_json") format = "json";
      const transcriptionPath = `./${name}_transcription.${format}`;

      console.log(`Writing ${format} to file...`);

      if (typeof response.data === "string") {
        fs.writeFileSync(transcriptionPath, response.data);
      } else if (response.data.text) {
        fs.writeFileSync(
          transcriptionPath,
          JSON.stringify(response.data, null, 2)
        );
      }

      console.log(`Transcription written to file: ${transcriptionPath}`);

      if (process.argv[5] === "--embed") {
        if (format === "srt" || format === "vtt") {
          console.log("Embedding subtitles to input file");
          const outputPath = `./${name}_with_subs.${ext}`;
          execSync(
            `ffmpeg -i ${initialPath} -vf subtitles=${transcriptionPath}:force_style='FontName=The Bold Font' ${outputPath}`,
            { stdio: "inherit" }
          );
        } else {
          console.log(`Cannot embed subtitles with format: ${format}`);
          process.exit(1);
        }
      }
    } else {
      console.log("No response received.");
    }

    process.exit(0);
  } else if (process.argv.length <= 2) {
    console.error("No query provided");
    process.exit(1);
  }

  const query = process.argv.slice(2).join(" ");
  const command = await generateCommand(query);
  const parsed = parseOutput(command);
  console.log(color.blue(`Command: ${parsed}`));

  const choice = await getInput("Execute? (y/N) ");
  if (choice.toLowerCase() !== "y") {
    process.exit(0);
  }
  execSync(parsed, { stdio: "inherit" });
};

const parseOutput = (output: string) => {
  const tripleBackticks = "```";
  const hasTripleBackticks = output.includes(tripleBackticks);

  if (!hasTripleBackticks) {
    return output;
  }

  const lines = output.split("\n");
  const tripleBackticksIndex = lines.findIndex((line) =>
    line.includes(tripleBackticks)
  );
  const lastTripleBackticksIndex = lines
    .slice()
    .reverse()
    .findIndex((line) => line.includes(tripleBackticks));

  return lines
    .slice(
      tripleBackticksIndex + 1,
      lines.length - lastTripleBackticksIndex - 1
    )
    .join("\n")
    .trim();
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

main().catch((e) => {
  console.error("An error occurred");
  /* console.error(e.response.data); */
  console.error(e);
  process.exit(1);
});
