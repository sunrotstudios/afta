import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGridItem } from '@/context/GridItemContext';
import { Search } from 'lucide-react';
import { searchAlbums, type SearchResultItem } from '@/lib/api/lastfm';
import { searchArtists } from '@/lib/api/spotify';

interface GridItemProps {
  row: number;
  column: number;
  gridType: 'artist' | 'album';
  itemId?: string;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function GridItem({
  row,
  column,
  gridType,
  itemId,
  imageUrl,
  title,
  subtitle,
}: GridItemProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { updateGridItem } = useGridItem();
  
  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };
  
  // Debounced search function
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const results = gridType === 'artist' 
        ? await searchArtists(query)
        : await searchAlbums(query);
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [gridType]);
  
  // Effect for search-as-you-type with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);
  
  const handleSelectItem = (item: SearchResultItem) => {
    updateGridItem(
      row, 
      column, 
      item.id, 
      item.imageUrl, 
      item.name, 
      item.artists || ''
    );
    handleCloseSearch();
  };

  return (
    <motion.div
      className="relative aspect-square w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: (row + column) * 0.1 }}
    >
      {itemId ? (
        <div 
          className="w-full h-full relative border-2 md:border-3 border-black rounded-md md:rounded-lg overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group"
        >
          {imageUrl && imageUrl !== '/placeholder.png' ? (
            <Image
              src={imageUrl}
              alt={title || "Grid item"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 25vw"
              unoptimized
              quality={100}
            />
          ) : (
            <div className="absolute inset-0 bg-purple-100 flex items-center justify-center">
              <div className="font-bold text-4xl text-purple-800">{title?.charAt(0)}</div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handleOpenSearch}
              className="opacity-0 group-hover:opacity-100 bg-yellow-300 border-2 border-black rounded-md p-1.5 transition-all hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              title="Change"
            >
              <Search size={14} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t-2 md:border-t-3 border-black p-1 md:p-1.5">
            <p className="font-bold text-xs md:text-sm truncate">{title}</p>
            {subtitle && <p className="text-[10px] md:text-xs truncate">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <motion.button
          className="w-full h-full flex items-center justify-center bg-white border-dashed border-2 md:border-3 border-black rounded-md md:rounded-lg text-xl font-bold text-center hover:bg-purple-100 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          onClick={handleOpenSearch}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center p-2 md:p-3">
            <span className="text-3xl md:text-4xl mb-1">+</span>
            <span className="text-xs md:text-sm">Add {gridType === 'artist' ? 'Artist' : 'Album'}</span>
          </div>
        </motion.button>
      )}
      
      {/* Search Modal Implementation */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="bg-white rounded-xl border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
              `,
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg md:text-xl font-bold">
                Search for {gridType === 'artist' ? 'Artist' : 'Album'}
              </h2>
              <button 
                onClick={handleCloseSearch}
                className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs md:text-sm"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-3">
              <div className="flex gap-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  placeholder={`Search ${gridType === 'artist' ? 'artists' : 'albums'}...`}
                  className="w-full px-3 py-2 text-sm rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="relative h-4 my-4">
              <svg width="100%" height="100%" viewBox="0 0 1200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 0L50 12L100 0L150 12L200 0L250 12L300 0L350 12L400 0L450 12L500 0L550 12L600 0L650 12L700 0L750 12L800 0L850 12L900 0L950 12L1000 0L1050 12L1100 0L1150 12L1200 0" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-6">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-2 mt-4">
                {searchResults.slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className="border-2 border-black rounded-md p-2 flex items-center gap-2 cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="min-w-12 h-12 md:min-w-14 md:h-14 bg-gray-200 rounded border-1 md:border-2 border-black relative overflow-hidden">
                      {item.imageUrl && item.imageUrl !== '/placeholder.png' ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          width={56}
                          height={56}
                          className="object-cover w-full h-full"
                          unoptimized
                          quality={100}
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                          <div className="font-bold text-lg">{item.name.charAt(0)}</div>
                        </div>
                      )}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <p className="font-bold text-xs md:text-sm truncate">{item.name}</p>
                      {item.artists && (
                        <p className="text-[10px] md:text-xs text-gray-600 truncate">{item.artists}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center p-4 text-sm text-gray-500">
                No results found. Try a different search.
              </div>
            ) : (
              <div className="text-center p-4 text-sm text-gray-500">
                Search for {gridType === 'artist' ? 'artists' : 'albums'} to add to your grid.
              </div>
            )}
            
            {searchResults.length > 3 && (
              <div className="text-center mt-2 text-xs text-purple-600">
                Showing top 3 results. Refine your search if needed.
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
