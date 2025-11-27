import OpenAI from "openai";
import { env } from "../config/env";

const client = new OpenAI({
  apiKey: env.embeddings.apiKey,
});

export const embedTexts = async (inputs: string[]) => {
  if (!inputs.length) {
    return [];
  }

  const response = await client.embeddings.create({
    model: env.embeddings.model,
    input: inputs,
    dimensions: env.embeddings.dimensions,
  });

  return response.data.map((item) => {
    if (!item.embedding) {
      throw new Error("Embedding provider returned empty vector");
    }
    return item.embedding;
  });
};

