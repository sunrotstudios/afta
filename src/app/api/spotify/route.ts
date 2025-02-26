import { NextRequest, NextResponse } from 'next/server';

// Spotify API base URLs
const SPOTIFY_API = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_API = 'https://accounts.spotify.com/api/token';

// Get Spotify access token
async function getSpotifyAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }
  
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_AUTH_API, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  return data.access_token;
}

// Search Spotify API
export async function GET(request: NextRequest) {
  try {
    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'artist';
    
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }
    
    // Get access token
    const accessToken = await getSpotifyAccessToken();
    
    // Make API request to Spotify
    const response = await fetch(
      `${SPOTIFY_API}/search?q=${encodeURIComponent(query)}&type=${type}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }
    
    // Return data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in Spotify API route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}