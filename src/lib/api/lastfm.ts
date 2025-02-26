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
    
    return response.results.albummatches.album.map((album: Record<string, unknown>) => {
      // Handle different image formats
      let imageUrl = '/placeholder.png';
      
      if (album.image && Array.isArray(album.image)) {
        // Find the largest available image (extralarge or large preferred)
        const extraLargeImg = album.image.find((img: Record<string, unknown>) => img.size === 'extralarge');
        if (extraLargeImg && extraLargeImg['#text']) {
          imageUrl = extraLargeImg['#text'];
        } else {
          const largeImg = album.image.find((img: Record<string, unknown>) => img.size === 'large');
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
    }).filter((album: SearchResultItem) => album.name && album.imageUrl !== '/placeholder.png'); // Filter out any invalid entries
  } catch (error) {
    console.error('Error searching for albums:', error);
    return [];
  }
}

// Get info about an artist
export async function getArtistInfo(name: string): Promise<SearchResultItem | null> {
  try {
    // For development or if no API key, return mock data
    if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
      // Create a simple mock artist
      const mockArtist: SearchResultItem = {
        id: name,
        name: name,
        imageUrl: '/placeholder.png',
        type: 'artist',
      };
      return mockArtist;
    }
    
    // This function would use a Last.fm client library 
    // For now let's use our own fetch function to get artist info
    const response = await lastFmFetch('artist.getInfo', { artist: name });
    
    if (!response.artist) {
      return null;
    }
    
    // Get the best image from the response
    let imageUrl = '/placeholder.png';
    if (response.artist.image && Array.isArray(response.artist.image)) {
      const extraLargeImg = response.artist.image.find((img: Record<string, unknown>) => img.size === 'extralarge');
      if (extraLargeImg && extraLargeImg['#text']) {
        imageUrl = extraLargeImg['#text'];
      }
    }
    
    return {
      id: response.artist.name,
      name: response.artist.name,
      imageUrl,
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
    // For development or if no API key, return mock data
    if (!process.env.NEXT_PUBLIC_LASTFM_API_KEY) {
      // Create a simple mock album
      const mockAlbum: SearchResultItem = {
        id: `${artist}-${album}`,
        name: album,
        imageUrl: '/placeholder.png',
        type: 'album',
        artists: artist
      };
      return mockAlbum;
    }
    
    // Using our own fetch function to get album info
    const response = await lastFmFetch('album.getInfo', { artist, album });
    
    if (!response.album) {
      return null;
    }
    
    // Get the best image from the response
    let imageUrl = '/placeholder.png';
    if (response.album.image && Array.isArray(response.album.image)) {
      const extraLargeImg = response.album.image.find((img: Record<string, unknown>) => img.size === 'extralarge');
      if (extraLargeImg && extraLargeImg['#text']) {
        imageUrl = extraLargeImg['#text'];
      }
    }
    
    return {
      id: `${response.album.artist}-${response.album.name}`,
      name: response.album.name,
      imageUrl,
      type: 'album',
      artists: response.album.artist,
    };
  } catch (error) {
    console.error('Error getting album info:', error);
    return null;
  }
}