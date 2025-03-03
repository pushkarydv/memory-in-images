# Memory in Images

Search within your images using natural language. This application allows you to upload images, automatically analyze them, and later search through them using conversational queries.

![Memory in Images](https://memory-in-images.vercel.app/banner.jpg)

## Why this?

The usual image search available has a limitation—you can't search for a specific moment you remember from thousands of images. However, with this approach, it becomes possible to search even for small details. Here are a few examples of queries you can make:

- Hiking on a mountain with cows on the path
- When I was fat
- Visiting a haunted place

## Features

- 🖼️ Upload and store images using Cloudinary
- 🔍 Search through images using natural language queries
- 🧠 Vector embeddings for efficient image search
- 🤖 Powered by Llama 3.2 11B model via Groq
- 📊 Vector storage via Upstash
- ⚡ Fast and responsive Next.js frontend

## Technology Stack

- **Frontend**: Next.js with TailwindCSS
- **Image Storage**: Cloudinary
- **AI Models**:
  - OpenAI for vector embeddings
  - Llama 3.2 11B via Groq for natural language processing
- **Vector Database**: Upstash Vector Database

## Deployment

### One-Click Deploy

Deploy directly to Vercel with all required environment variables:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpushkarydv%2Fmemory-in-images&env=CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,GROQ_API_KEY,OPENAI_API_KEY,UPSTASH_URL,UPSTASH_TOKEN,NEXT_PUBLIC_UPLOAD_DISABLED&envDescription=Please%20visit%20memory-in-images.vercel.app%2Fdeploy%20to%20know%20how%20to%20get%20and%20set%20these%20up&envLink=https%3A%2F%2Fmemory-in-images.vercel.app%2Fdeploy&project-name=memory-in-images&repository-name=memory-in-images&demo-title=Memory%20In%20Images&demo-description=Search%20within%20your%20images%20using%20natural%20language.&demo-url=https%3A%2F%2Fmemory-in-images.vercel.app&demo-image=https%3A%2F%2Fmemory-in-images.vercel.app%2Fbanner.jpg)

### Environment Variables Setup

#### Cloudinary (Image Storage)
1. Create a free account at [Cloudinary](https://cloudinary.com/users/register/free)
2. Navigate to the Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Create an unsigned upload preset in Settings > Upload > Upload presets
5. Add these values to your .env.local file:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### AI Providers (Both Required)

**OpenAI API (for embeddings)**
1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create a new secret key
3. Add to your .env.local file:
```
OPENAI_API_KEY=sk-your_openai_api_key
```

**Groq API (for Llama 3.2 11B model)**
1. Sign up at [Groq](https://console.groq.com/)
2. Generate an API key
3. Add to your .env.local file:
```
GROQ_API_KEY=your_groq_api_key
```

#### Upstash Vector Database
1. Sign up at [Upstash](https://upstash.com/)
2. Create a new Vector database
3. Get the REST API URL and Token
4. Add to your .env.local file:
```
UPSTASH_URL=your_upstash_url
UPSTASH_TOKEN=your_upstash_token
```

#### Additional Settings
Control whether uploads are enabled:
```
NEXT_PUBLIC_UPLOAD_DISABLED=false
```

## How It Works

1. **Image Upload**: Images are uploaded to Cloudinary for storage.
2. **Image Analysis**: Each image is analyzed using LLaMA 3.2 Vision, generating descriptive text and vector embeddings via OpenAI.
3. **Vector Storage**: Embeddings are stored in the Upstash Vector Database.
4. **Natural Language Search**: User queries are converted to vectors using `text-embedding-3-small`.
5. **Vector Matching**: The system finds relevant images based on vector similarity.
6. **Image Display**: Matched images are displayed with their similarity scores.

![image](https://github.com/user-attachments/assets/7da8120a-37d1-41b5-a879-5de5b3d1f102)
![image](https://github.com/user-attachments/assets/73a54251-6fd9-4c24-91b6-745fe62aab9f)



<details>
<summary><h2>Screenshots</h2></summary>

<img width="1280" alt="Screenshot 2025-03-03 at 7 01 45 AM" src="https://github.com/user-attachments/assets/77eda0ce-b532-426d-a70a-223a5ec4d9bd" />
<img width="1280" alt="Screenshot 2025-03-03 at 7 00 54 AM" src="https://github.com/user-attachments/assets/1a5ab261-e714-4dcc-b83c-9faac5a28d11" />
<img width="1280" alt="Screenshot 2025-03-03 at 7 00 24 AM" src="https://github.com/user-attachments/assets/dd0f9318-b7b8-47b2-a53d-958b5b9979ec" />
</details>

## Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/memory-in-images.git
cd memory-in-images
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file with all the required environment variables

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues during setup or deployment:
- Email: pushkaryadavin@gmail.com
- Create an issue in this repository

## Live Demo

Check out the [live demo](https://memory-in-images.vercel.app) to see the application in action.

---

Built with ❤️ by [Pushkar Yadav](https://github.com/pushkarydv)
