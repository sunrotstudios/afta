import { SearchResultItem } from './lastfm';

// Search for artists using our Next.js API route
export async function searchArtists(query: string): Promise<SearchResultItem[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`/api/spotify?q=${encodeURIComponent(query)}&type=artist`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.artists || !data.artists.items || !data.artists.items.length) {
      return [];
    }
    
    return data.artists.items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images && artist.images.length ? artist.images[0].url : '/placeholder.png',
      type: 'artist' as const,
    })).filter((artist: any) => artist.name && artist.imageUrl !== '/placeholder.png');
  } catch (error) {
    console.error('Error searching for artists:', error);
    return [];
  }
}


// No default export needed