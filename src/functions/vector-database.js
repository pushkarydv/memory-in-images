import { Index } from '@upstash/vector';

const addImage = async (id, image_url, vectors_array) => {
  try {
    const index = new Index({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_TOKEN,
    });

    await index.upsert({
      id,
      vector: vectors_array,
      metadata: { image_url },
    });
  } catch (e) {
    console.error(`[ERROR] ${JSON.stringify(e, null, 2)}`);
  }
};

const getQueryResults = async (vectors_array) => {
  try {
    const index = new Index({
      url: process.env.UPSTASH_URL,
      token: process.env.UPSTASH_TOKEN,
    });

    const results = await index.query({
      vector: vectors_array,
      includeMetadata: true,
      topK: 3,
    });

    return results;
  } catch (e) {
    console.error(`[ERROR] ${JSON.stringify(e, null, 2)}`);
    return [];
  }
};

export { addImage, getQueryResults };
