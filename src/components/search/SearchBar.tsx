'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGrid } from '@/context/GridContext';
import Image from 'next/image';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{id: string; name: string; image: string; subtitle: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { grid, updateGridItem } = useGrid();

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setShowResults(true);

    try {
      // Mock search results for now
      const mockResults = [...Array(5)].map((_, i) => ({
        id: `result-${i}`,
        name: `${grid.type === 'artist' ? 'Artist' : 'Album'} ${i + 1} for "${query}"`,
        image: 'https://via.placeholder.com/75',
        subtitle: grid.type === 'artist' ? 'Popular Artist' : 'By Some Artist'
      }));

      // Simulate API delay
      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-[24px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
          linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
      }}
      ref={searchRef}
    >
      {/* App Logo and Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex">
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-black mr-2"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black"></div>
          </div>
        </div>
        <motion.h2
          className="text-2xl md:text-3xl font-black text-black"
          style={{
            fontFamily: "Mondwest, 'Mondwest Regular', monospace",
            textShadow: "2px 2px 0px rgba(168, 85, 247, 0.3)",
          }}
        >
          Search {grid.type === 'artist' ? 'Artists' : 'Albums'}
        </motion.h2>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={`Search for ${grid.type === 'artist' ? 'artists' : 'albums'}...`}
            className="w-full px-4 py-3 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <motion.button
          onClick={handleSearch}
          className="py-3 px-6 rounded-lg bg-yellow-300 text-black font-bold hover:translate-y-[-2px] hover:translate-x-[-2px] border-2 border-black transition-all flex items-center gap-2"
          style={{ 
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(245, 158, 11, 0.1) 5px, rgba(245, 158, 11, 0.1) 10px)'
          }}
          whileHover={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Search size={18} />
          Search
        </motion.button>
      </div>
      
      {/* Search Results */}
      {showResults && (
        <div className="mt-4 border-t-2 border-black pt-4">
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <h3 className="font-bold mb-2">Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((result) => (
                  <div 
                    key={result.id}
                    className="border-2 border-black rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() => {
                      // Find first empty grid slot
                      const emptyIndex = grid.items.findIndex(item => !item.item);
                      if (emptyIndex !== -1) {
                        updateGridItem(emptyIndex, {
                          id: result.id,
                          name: result.name,
                          imageUrl: result.image,
                          type: grid.type,
                          artists: grid.type === 'album' ? result.subtitle : undefined
                        });
                        setShowResults(false);
                        setQuery('');
                      }
                    }}
                  >
                    <div className="relative w-12 h-12 border-2 border-black rounded-md overflow-hidden">
                      <Image 
                        src={result.image} 
                        alt={result.name} 
                        width={48} 
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{result.name}</p>
                      <p className="text-xs text-gray-600 truncate">{result.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4">No results found. Try a different search term.</p>
          )}
        </div>
      )}
    </motion.div>
  );
}