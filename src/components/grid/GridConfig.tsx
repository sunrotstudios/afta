'use client';

import { useState } from 'react';
import { useGrid } from '@/context/GridContext';
import { motion } from 'framer-motion';

interface GridConfigProps {
  onGridCreated?: () => void;
}

export default function GridConfig({ onGridCreated }: GridConfigProps) {
  const { createGrid } = useGrid();
  const [gridType, setGridType] = useState<'artist' | 'album'>('artist');
  const [title, setTitle] = useState('My Music Grid');

  // Always use 3x3 grid
  const rows = 3;
  const columns = 3;

  const handleCreateGrid = () => {
    createGrid(rows, columns, gridType, title);
    if (onGridCreated) {
      onGridCreated();
    }
  };

  return (
    <motion.div
      className="bg-white rounded-[20px] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-5 relative w-[92%] md:w-[70%] max-w-[550px] mx-auto"
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
    >
      {/* App Logo and Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-500 border-2 border-black mr-1.5"></div>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-400 border-2 border-black mr-1.5"></div>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-500 border-2 border-black"></div>
          </div>
        </div>
        <motion.h1
          className="text-2xl md:text-6xl font-black text-right text-black"
          style={{
            fontFamily: "Mondwest, 'Mondwest Regular', monospace",
            textShadow: "1px 1px 0px rgba(168, 85, 247, 0.3)",
          }}
        >
          Cratify
        </motion.h1>
      </div>

     
      
      <div className="mb-4">
        <label className="block text-sm md:text-base mb-1 font-bold text-black">GRID TITLE</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
          placeholder="NAME YOUR COLLECTION"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm md:text-base mb-1 font-bold text-black">GRID TYPE</label>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => setGridType('artist')}
            className={`flex-1 py-2 px-3 rounded-lg border-2 border-black transition-all font-bold text-sm md:text-base ${
              gridType === 'artist' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-black hover:bg-purple-100'
            } ${gridType === 'artist' ? 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
          >
            ARTISTS
          </button>
          <button
            onClick={() => setGridType('album')}
            className={`flex-1 py-2 px-3 rounded-lg border-2 border-black transition-all font-bold text-sm md:text-base ${
              gridType === 'album' 
                ? 'bg-purple-500 text-white' 
                : 'bg-white text-black hover:bg-purple-100'
            } ${gridType === 'album' ? 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
          >
            ALBUMS
          </button>
        </div>
      </div>
      
      {/* Divider */}
      <div className="relative h-4 my-4">
        <svg width="100%" height="100%" viewBox="0 0 1200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L50 12L100 0L150 12L200 0L250 12L300 0L350 12L400 0L450 12L500 0L550 12L600 0L650 12L700 0L750 12L800 0L850 12L900 0L950 12L1000 0L1050 12L1100 0L1150 12L1200 0" stroke="black" strokeWidth="2" />
        </svg>
      </div>
      
      <motion.button
        onClick={handleCreateGrid}
        className="w-full py-2.5 md:py-3 rounded-lg bg-yellow-300 text-black font-bold hover:translate-y-[-1px] hover:translate-x-[-1px] border-2 md:border-3 border-black transition-all text-sm md:text-base"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(245, 158, 11, 0.1) 5px, rgba(245, 158, 11, 0.1) 10px)',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
        }}
        whileHover={{
          boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        CREATE GRID
      </motion.button>
    </motion.div>
  );
}