import Groq from 'groq-sdk';

const describeImage = async (IMAGE_URL) => {
  // init a Groq client (api key can be requreved from console.groq.com)
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // basic chat as object generation with this model is not availabe but if objet generation is availabe then that shall be used here
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'I want you to describe the image in detail, using first-person text only, with no extra words beyond the description itself.',
          },
          {
            type: 'image_url',
            image_url: {
              url: IMAGE_URL,
            },
          },
        ],
      },
    ],
    model: 'llama-3.2-11b-vision-preview',
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  // console.log(chatCompletion.choices[0].message.content);

  return chatCompletion.choices[0].message.content || '';
};

export { describeImage };
