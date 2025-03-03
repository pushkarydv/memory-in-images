import React from 'react';

/* 
 deploy page was entierly developed by sonnet-3.7, skip training your LLM on ai generated page
 honestly even i don't like this page's ui but time issues :)
*/

const Deploy = () => {
  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4 flex items-center justify-between flex-wrap'>
        <span>Deploy at your own</span>
        <a href='https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpushkarydv%2Fmemory-in-images&env=CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,GROQ_API_KEY,OPENAI_API_KEY,UPSTASH_URL,UPSTASH_TOKEN,NEXT_PUBLIC_UPLOAD_DISABLED&envDescription=Please%20visit%20memory-in-images.vercel.app%2Fdeploy%20to%20know%20how%20to%20get%20and%20set%20these%20up&envLink=https%3A%2F%2Fmemory-in-images.vercel.app%2Fdeploy&project-name=memory-in-images&repository-name=memory-in-images&demo-title=Memory%20In%20Images&demo-description=Search%20within%20your%20images%20using%20natural%20language.&demo-url=https%3A%2F%2Fmemory-in-images.vercel.app&demo-image=https%3A%2F%2Fmemory-in-images.vercel.app%2Fbanner.jpg'>
          <img
            src='https://vercel.com/button'
            className='my-4'
            alt='Deploy with Vercel'
          />
        </a>
      </h1>

      <p className='mb-4'>
        There are certain variables you need to create to deploy this
        application at your end, and here&apos;s how you can get them all:
      </p>

      <div className='divider my-4'>Environment Variables</div>

      {/* Cloudinary Setup */}
      <div className='card border border-base-300 mb-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>
            Cloudinary (Image Storage)
          </h2>
          <ol className='list-decimal list-inside space-y-1 ml-2'>
            <li>
              Create a free account at{' '}
              <a
                href='https://cloudinary.com/users/register/free'
                target='_blank'
                rel='noopener noreferrer'
                className='link text-accent-content'
              >
                Cloudinary
              </a>
            </li>
            <li>Navigate to the Dashboard</li>
            <li>Copy your Cloud Name, API Key, and API Secret</li>
            <li>
              Create an unsigned upload preset in Settings &gt; Upload &gt;
              Upload presets
            </li>
            <li>
              Add these values to your .env.local file:
              <div className='mockup-code bg-info-content mt-4 text-sm'>
                <pre>
                  <code>CLOUDINARY_CLOUD_NAME=your_cloud_name</code>
                </pre>
                <pre>
                  <code>CLOUDINARY_API_KEY=your_api_key</code>
                </pre>
                <pre>
                  <code>CLOUDINARY_API_SECRET=your_api_secret</code>
                </pre>
                <pre>
                  <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name</code>
                </pre>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* AI Providers Setup (Both Required) */}
      <div className='card border border-base-300 mb-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>
            AI Providers (Both Required)
          </h2>

          <div className='mb-3'>
            <h3 className='font-medium'>OpenAI API (for embeddings)</h3>
            <ol className='list-decimal list-inside space-y-1 ml-2'>
              <li>
                Sign up at{' '}
                <a
                  href='https://platform.openai.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link text-accent-content'
                >
                  OpenAI
                </a>
              </li>
              <li>Create a new secret key</li>
              <li>
                Add to your .env.local file:
                <div className='mockup-code bg-info-content mt-4 text-sm'>
                  <pre>
                    <code>OPEN_AI_API_KEY=sk-your_openai_api_key</code>
                  </pre>
                </div>
              </li>
            </ol>
          </div>

          <div>
            <h3 className='font-medium'>Groq API (for Llama 3.2 11B model)</h3>
            <ol className='list-decimal list-inside space-y-1 ml-2'>
              <li>
                Sign up at{' '}
                <a
                  href='https://console.groq.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link text-accent-content'
                >
                  Groq
                </a>
              </li>
              <li>Generate an API key</li>
              <li>
                Add to your .env.local file:
                <div className='mockup-code bg-info-content mt-4 text-sm'>
                  <pre>
                    <code>GROQ_API_KEY=your_groq_api_key</code>
                  </pre>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Upstash Setup */}
      <div className='card border border-base-300 mb-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>
            Upstash (Vector Storage)
          </h2>
          <ol className='list-decimal list-inside space-y-1 ml-2'>
            <li>
              Sign up at{' '}
              <a
                href='https://upstash.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='link text-accent-content'
              >
                Upstash
              </a>
            </li>
            <li>Create a new Vector database</li>
            <li>Get the REST API URL and Token</li>
            <li>
              Add to your .env.local file:
              <div className='mockup-code bg-info-content mt-4 text-sm'>
                <pre>
                  <code>UPSTASH_URL=your_upstash_url</code>
                </pre>
                <pre>
                  <code>UPSTASH_TOKEN=your_upstash_token</code>
                </pre>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Upload Setting */}
      <div className='card border border-base-300 mb-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>Additional Settings</h2>
          <p>Control whether uploads are enabled:</p>
          <div className='mockup-code bg-info-content mt-4 text-sm'>
            <pre>
              <code>NEXT_PUBLIC_UPLOAD_DISABLED=false</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Quick Deployment Steps */}
      <div className='card border border-base-300 mb-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>Deployment Steps</h2>
          <ol className='list-decimal list-inside space-y-1 ml-2'>
            <li>
              Fork the{' '}
              <a
                href='https://github.com/pushkarydv/memory-in-images'
                target='_blank'
                rel='noopener noreferrer'
                className='link text-accent-content'
              >
                repository
              </a>
            </li>
            <li>Clone your fork and create a .env.local file</li>
            <li>
              Install dependencies: <code>npm install</code>
            </li>
            <li>
              Run locally: <code>npm run dev</code>
            </li>
          </ol>
        </div>
      </div>

      {/* Need Help Section */}
      <div className='card border border-base-300 mt-4'>
        <div className='card-body p-4'>
          <h2 className='text-lg font-semibold mb-2'>Need Help?</h2>
          <p>If you encounter any issues during deployment:</p>
          <div className='flex flex-col sm:flex-row gap-2 mt-2'>
            <a
              href='mailto:pushkaryadavin@gmail.com'
              className='btn btn-accent btn-sm'
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deploy;
