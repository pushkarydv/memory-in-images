import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getQueryResults } from './vector-database';

async function generateEmbeedings(text) {
  try {
    openai.apiKey = process.env.OPENAI_API_KEY;

    const { embedding, usage } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: text,
    });

    return embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
  }
}

const search_in_image = async (query) => {
  console.log(`[INFO] Searching for: ${query}`);

  const queryVectors = await generateEmbeedings(query);
  const results = await getQueryResults(queryVectors);

  const responseObj = results.map((result) => {
    return {
      match: (result.score * 100).toFixed(0),
      url: result.metadata.image_url,
    };
  });

  return responseObj;
};

export { generateEmbeedings, search_in_image };
