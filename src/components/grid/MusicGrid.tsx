'use client';

import { useRef, useState } from 'react';
import { useGrid } from '@/context/GridContext';
import { motion as m } from 'framer-motion';
import { Download, Share2, Check } from 'lucide-react';
import GridItem from './GridItem';
import * as htmlToImage from 'html-to-image';

export default function MusicGrid() {
  const { grid } = useGrid();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [success, setSuccess] = useState<'download' | 'share' | null>(null);
  
  if (!grid || !grid.items || grid.items.length === 0) {
    return null;
  }
  
  // Convert grid to image and download it
  const downloadImage = async () => {
    if (!gridRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // Add a class to temporarily make the grid look better for export
      gridRef.current.classList.add('exporting');
      
      // Generate a high-quality PNG
      const dataUrl = await htmlToImage.toPng(gridRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        skipFonts: false,
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '24px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          padding: '24px'
        }
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${grid.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      
      // Show success indicator
      setSuccess('download');
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Error creating image:', error);
    } finally {
      // Remove the export class
      if (gridRef.current) {
        gridRef.current.classList.remove('exporting');
      }
      setIsDownloading(false);
    }
  };
  
  // Share the grid image (uses Web Share API where available)
  const shareImage = async () => {
    if (!gridRef.current) return;
    
    try {
      setIsSharing(true);
      
      // Add a class to temporarily make the grid look better for export
      gridRef.current.classList.add('exporting');
      
      // Generate the image
      const dataUrl = await htmlToImage.toPng(gridRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        skipFonts: false,
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '24px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          padding: '24px'
        }
      });
      
      // Try to use Web Share API if available
      if (navigator.share) {
        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `${grid.title.replace(/\s+/g, '-').toLowerCase()}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: grid.title,
          text: `Check out my ${grid.type} grid: ${grid.title}`,
          files: [file]
        });
      } else {
        // Fallback: download the image if Web Share API not available
        const link = document.createElement('a');
        link.download = `${grid.title.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
      }
      
      // Show success indicator
      setSuccess('share');
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Error sharing image:', error);
    } finally {
      // Remove the export class
      if (gridRef.current) {
        gridRef.current.classList.remove('exporting');
      }
      setIsSharing(false);
    }
  };

  // Create a 2D array from the 1D items array
  const gridArray: Array<Array<typeof grid.items[0]>> = [];
  for (let i = 0; i < grid.rows; i++) {
    gridArray[i] = [];
    for (let j = 0; j < grid.columns; j++) {
      const index = i * grid.columns + j;
      gridArray[i][j] = grid.items[index];
    }
  }

  return (
    <m.div
      className="bg-white rounded-[18px] border-3 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-3 md:p-5 relative w-full max-w-[700px] mx-auto overflow-hidden"
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
      <div 
        ref={gridRef} 
        className="relative bg-white p-6 md:p-10 rounded-[24px] border-3 border-black" 
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
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center">
            <div className="flex">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-500 border-2 border-black mr-1.5"></div>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-yellow-400 border-2 border-black"></div>
            </div>
          </div>
          <h2
            className="text-lg md:text-2xl font-black text-black"
            style={{
              fontFamily: "Mondwest, 'Mondwest Regular', monospace",
              textShadow: "1px 1px 0px rgba(168, 85, 247, 0.3)",
            }}
          >
            {grid.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 w-full md:w-11/12 mx-auto">
          {gridArray.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const index = rowIndex * grid.columns + colIndex;
              const item = grid.items[index];
              
              return (
                <GridItem
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  column={colIndex}
                  gridType={grid.type}
                  itemId={item?.item?.id}
                  imageUrl={item?.item?.imageUrl}
                  title={item?.item?.name}
                  subtitle={grid.type === 'album' ? item?.item?.artists : undefined}
                />
              );
            })
          )}
        </div>
        
        {/* Footer for Export */}
        <div className="mt-6 md:mt-8 text-center text-sm text-gray-500 font-bold" style={{
          fontFamily: "Mondwest, 'Mondwest Regular', monospace",
        }}>
          cratify.io
        </div>
      </div>

      {/* Divider */}
      <div className="relative h-4 my-4">
        <svg width="100%" height="100%" viewBox="0 0 1200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L50 12L100 0L150 12L200 0L250 12L300 0L350 12L400 0L450 12L500 0L550 12L600 0L650 12L700 0L750 12L800 0L850 12L900 0L950 12L1000 0L1050 12L1100 0L1150 12L1200 0" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-2 md:gap-3">
        <m.button
          onClick={shareImage}
          disabled={isSharing || isDownloading}
          className={`py-2 px-4 md:py-2.5 md:px-5 rounded-lg bg-purple-500 text-white font-bold hover:translate-y-[-1px] hover:translate-x-[-1px] border-2 border-black transition-all flex items-center gap-1.5 text-sm md:text-base ${(isSharing || isDownloading) ? 'opacity-70 cursor-not-allowed' : ''}`}
          style={{ boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)' }}
          whileHover={{ boxShadow: '1px 1px 0px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
        >
          {isSharing ? (
            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
          ) : success === 'share' ? (
            <Check size={16} />
          ) : (
            <Share2 size={16} />
          )}
          {success === 'share' ? 'Shared!' : 'Share Grid'}
        </m.button>
        
        <m.button
          onClick={downloadImage}
          disabled={isSharing || isDownloading}
          className={`py-2 px-4 md:py-2.5 md:px-5 rounded-lg bg-yellow-300 text-black font-bold hover:translate-y-[-1px] hover:translate-x-[-1px] border-2 border-black transition-all flex items-center gap-1.5 text-sm md:text-base ${(isSharing || isDownloading) ? 'opacity-70 cursor-not-allowed' : ''}`}
          style={{ 
            boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(245, 158, 11, 0.1) 5px, rgba(245, 158, 11, 0.1) 10px)'
          }}
          whileHover={{ boxShadow: '1px 1px 0px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
        >
          {isDownloading ? (
            <div className="animate-spin h-4 w-4 border-2 border-black rounded-full border-t-transparent"></div>
          ) : success === 'download' ? (
            <Check size={16} />
          ) : (
            <Download size={16} />
          )}
          {success === 'download' ? 'Downloaded!' : 'Download'}
        </m.button>
      </div>
    </m.div>
  );
}