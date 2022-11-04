import { openai } from "../config";

export const img = async (query: string) => {
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

  console.log(response.data.data[0].url.trim());
};
