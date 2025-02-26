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
    
    return data.artists.items.map((artist: Record<string, unknown>) => {
      // Safe access to nested properties with proper type checking
      let imageUrl = '/placeholder.png';
      if (artist.images && Array.isArray(artist.images) && artist.images.length > 0 && 
          typeof artist.images[0] === 'object' && artist.images[0] !== null && 'url' in artist.images[0]) {
        imageUrl = artist.images[0].url as string;
      }
      
      return {
        id: artist.id as string,
        name: artist.name as string,
        imageUrl,
        type: 'artist' as const,
      };
    }).filter((artist: SearchResultItem) => artist.name && artist.imageUrl !== '/placeholder.png');
  } catch (error) {
    console.error('Error searching for artists:', error);
    return [];
  }
}


// No default export needed