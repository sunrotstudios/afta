import { useGrid } from '@/context/GridContext';
import GridItem from './GridItem';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';

export default function Grid() {
  const { grid, gridType, title } = useGrid();
  
  if (!grid || grid.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="bg-white rounded-[24px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative w-[94%] md:w-[90%] max-w-[900px] mx-auto my-6"
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex">
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-black mr-2"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black"></div>
          </div>
        </div>
        <motion.h2
          className="text-3xl md:text-4xl font-black"
          style={{
            fontFamily: "Mondwest, system-ui, sans-serif",
            textShadow: "2px 2px 0px rgba(168, 85, 247, 0.3)",
          }}
        >
          {title}
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {grid.map((row, rowIndex) =>
          row.map((item, colIndex) => (
            <GridItem
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              column={colIndex}
              gridType={gridType}
              itemId={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))
        )}
      </div>
      
      <div className="relative h-4 my-4">
        <svg width="100%" height="100%" viewBox="0 0 1200 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0L50 12L100 0L150 12L200 0L250 12L300 0L350 12L400 0L450 12L500 0L550 12L600 0L650 12L700 0L750 12L800 0L850 12L900 0L950 12L1000 0L1050 12L1100 0L1150 12L1200 0" stroke="black" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <motion.button
          className="py-3 px-6 rounded-lg bg-purple-500 text-white font-bold hover:translate-y-[-2px] hover:translate-x-[-2px] border-2 border-black transition-all flex items-center gap-2"
          style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
          whileHover={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 size={18} />
          Share Grid
        </motion.button>
        
        <motion.button
          className="py-3 px-6 rounded-lg bg-yellow-300 text-black font-bold hover:translate-y-[-2px] hover:translate-x-[-2px] border-2 border-black transition-all flex items-center gap-2"
          style={{ 
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(245, 158, 11, 0.1) 5px, rgba(245, 158, 11, 0.1) 10px)'
          }}
          whileHover={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={18} />
          Download Image
        </motion.button>
      </div>
    </motion.div>
  );
}
