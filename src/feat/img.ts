import fs from "fs";
import fetch from "node-fetch";

import { openai } from "../config";

export const img = async (query: string) => {
  console.log("Generating image...");
  const response = await openai.createImage({
    prompt: query,
    n: 1,
    size: "512x512",
  });

  if (response.data.data.length <= 0) {
    console.error("No choices returned");
    process.exit(1);
  }

  if (!response.data.data[0]?.url) {
    console.error("No url returned");
    process.exit(1);
  }

  const url = response.data.data[0].url.trim();
  const name = `${new Date().toISOString()}.png`;

  console.log("Downloading image...");
  await downloadImage(url, name);

  console.log(`Image saved to ${name}`);
};

const downloadImage = async (url: string, name: string) => {
  const res = await fetch(url);
  res.body?.pipe(fs.createWriteStream(name));
};
