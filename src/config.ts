import { Configuration, OpenAIApi } from "openai";

export const config = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"] ?? "",
});

export const openai = new OpenAIApi(config);
