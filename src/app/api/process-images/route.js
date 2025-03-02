import { describeImage } from '@/functions/image-description';
import { addImage } from '@/functions/vector-database';
import { generateEmbeedings } from '@/functions/vector-embeedings';
import { NextResponse } from 'next/server';

export const maxDuration = 60;
const BATCH_SIZE = 10;

export async function POST(request) {
  if (process.env.NEXT_PUBLIC_UPLOAD_DISABLED === 'true') {
    return NextResponse.json(
      { message: 'Upload is disabled' },
      { status: 400 }
    );
  }
  try {
    const { images } = await request.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { message: 'No images provided' },
        { status: 400 }
      );
    }

    const results = [];

    // Process images in batches
    for (let i = 0; i < images.length; i += BATCH_SIZE) {
      const batch = images.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.allSettled(
        batch.map(async (image) => {
          try {
            const { id, url } = image;
            const description = await describeImage(url);
            const embeddings = await generateEmbeedings(description);
            await addImage(id, url, embeddings);
            return { id, url, description };
          } catch (error) {
            console.error(`Error processing image ${image.id}:`, error);
            return { id: image.id, error: error.message };
          }
        })
      );

      results.push(
        ...batchResults.map((r) =>
          r.status === 'fulfilled' ? r.value : r.reason
        )
      );
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Error processing images:', error);
    return NextResponse.json(
      { message: 'Error processing images: ' + error.message },
      { status: 500 }
    );
  }
}
