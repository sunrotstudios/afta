export type SearchResultItem = {
  id: string;
  name: string;
  imageUrl: string;
  type: 'artist' | 'album';
  artists?: string; // Only for albums
};

// Direct Last.fm API fetch (no npm package)
async function lastFmFetch(method: string, params: Record<string, string>) {
  const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY || 'YOUR_API_KEY';
  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  
  url.searchParams.append('method', method);
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('format', 'json');
  
  // Add all other params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Last.fm API error: ${response.statusText}`);
  }
  
  return response.json();
}

// Search for albums using Last.fm
export async function searchAlbums(query: string): Promise<SearchResultItem[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await lastFmFetch('album.search', {
      album: query,
      limit: '10'
    });
    
    if (!response.results?.albummatches?.album || !Array.isArray(response.results.albummatches.album)) {
      console.log('No albums found or invalid response');
      return [];
    }
    
    return response.results.albummatches.album.map((album: any) => {
      // Handle different image formats
      let imageUrl = '/placeholder.png';
      
      if (album.image && Array.isArray(album.image)) {
        // Find the largest available image (extralarge or large preferred)
        const extraLargeImg = album.image.find((img: any) => img.size === 'extralarge');
        if (extraLargeImg && extraLargeImg['#text']) {
          imageUrl = extraLargeImg['#text'];
        } else {
          const largeImg = album.image.find((img: any) => img.size === 'large');
          if (largeImg && largeImg['#text']) {
            imageUrl = largeImg['#text'];
          }
        }
      }
      
      return {
        id: album.mbid || `${album.artist}-${album.name}`, // Use mbid if available
        name: album.name,
        imageUrl,
        type: 'album' as const,
        artists: album.artist,
      };
    }).filter((album: any) => album.name && album.imageUrl !== '/placeholder.png'); // Filter out any invalid entries
  } catch (error) {
    console.error('Error searching for albums:', error);
    return [];
  }
}

// Get info about an artist
export async function getArtistInfo(name: string): Promise<SearchResultItem | null> {
  try {
    // For development or if no API key, use mock data
    if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
      const mockArtist = mockArtists.find(artist => artist.name === name);
      return mockArtist || null;
    }
    
    const response = await lastfm.artistGetInfo({ artist: name });
    
    if (!response.artist) {
      return null;
    }
    
    return {
      id: response.artist.name,
      name: response.artist.name,
      imageUrl: getBestImage(response.artist.image),
      type: 'artist',
    };
  } catch (error) {
    console.error('Error getting artist info:', error);
    return null;
  }
}

// Get info about an album
export async function getAlbumInfo(artist: string, album: string): Promise<SearchResultItem | null> {
  try {
    // For development or if no API key, use mock data
    if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
      const mockAlbum = mockAlbums.find(a => a.name === album && a.artists === artist);
      return mockAlbum || null;
    }
    
    const response = await lastfm.albumGetInfo({ artist, album });
    
    if (!response.album) {
      return null;
    }
    
    return {
      id: `${response.album.artist}-${response.album.name}`,
      name: response.album.name,
      imageUrl: getBestImage(response.album.image),
      type: 'album',
      artists: response.album.artist,
    };
  } catch (error) {
    console.error('Error getting album info:', error);
    return null;
  }
}