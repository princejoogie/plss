import { Configuration, OpenAIApi } from "openai";

export const config = new Configuration({
  apiKey: process.env["OPENAI_APIKEY"] as string,
});

export const openai = new OpenAIApi(config);
