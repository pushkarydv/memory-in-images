import { search_in_image } from '@/functions/vector-embeedings';

export const runtime = 'edge';

export async function POST(req, res) {
  const body = await req.json();
  const query = body?.query || '';

  if (query === '') {
    return Response.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const results = await search_in_image(query);
    return Response.json({ results }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
