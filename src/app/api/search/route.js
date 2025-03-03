import { search_in_image } from '@/functions/vector-embeedings';

export const runtime = 'edge';

export async function POST(req, res) {
  const body = await req.json();
  const query = body?.query || '';

  if (query === '') {
    return Response.json({ error: 'Query is required' }, { status: 400 });
  }

  // one static param, remove this for any prod app
  if(query.includes('pushkar')){
    return Response.json({ results: [{
      match: 100000,
      url: "https://res.cloudinary.com/dc82gsslp/image/upload/q_auto:low,w_800/v1740964025/uploads/0de7d2436f39e962fd37e55d3771015087b8fb241ec92d7ff63673332b6724d9.jpg"
    }] }, { status: 200 });
  }

  try {
    const results = await search_in_image(query);
    return Response.json({ results }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
