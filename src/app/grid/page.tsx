'use client';

import { useGrid } from '@/context/GridContext';
import { GridProvider } from '@/context/GridContext';
import { GridItemProvider } from '@/context/GridItemContext';
import MusicGrid from '@/components/grid/MusicGrid';
import SearchBar from '@/components/search/SearchBar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GridPage() {
  const router = useRouter();
  
  return (
    <GridItemProvider>
      <div className="min-h-[100dvh] w-full relative overflow-hidden bg-gradient-to-br from-[#161616] via-[#1a1a1a] to-[#212121]">
          {/* Grain Overlay */}
          <div className="grain-overlay fixed inset-0 pointer-events-none z-0 opacity-20"></div>
          
          {/* Decorative Background Elements */}
          <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full blur-3xl" style={{ width: '300px', height: '300px', backgroundColor: 'rgba(168, 85, 247, 0.2)', left: '20%', top: '30%', transform: 'translate(-50%, -50%)', animation: 'float 25s ease-in-out infinite alternate' }}></div>
            <div className="absolute rounded-full blur-3xl" style={{ width: '250px', height: '250px', backgroundColor: 'rgba(245, 158, 11, 0.15)', left: '70%', top: '20%', transform: 'translate(-50%, -50%)', animation: 'float 30s ease-in-out infinite alternate' }}></div>
            <div className="absolute rounded-full blur-3xl" style={{ width: '400px', height: '400px', backgroundColor: 'rgba(168, 85, 247, 0.2)', left: '80%', top: '60%', transform: 'translate(-50%, -50%)', animation: 'float 23s ease-in-out infinite alternate' }}></div>
            <div className="absolute rounded-full blur-3xl" style={{ width: '350px', height: '350px', backgroundColor: 'rgba(245, 158, 11, 0.15)', left: '30%', top: '70%', transform: 'translate(-50%, -50%)', animation: 'float 28s ease-in-out infinite alternate' }}></div>
            <div className="absolute rounded-full blur-3xl" style={{ width: '280px', height: '280px', backgroundColor: 'rgba(168, 85, 247, 0.2)', left: '10%', top: '10%', transform: 'translate(-50%, -50%)', animation: 'float 32s ease-in-out infinite alternate' }}></div>
          </div>
          
          <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center items-center py-10 px-4">
            <div className="max-w-[1200px] w-full mx-auto">
              <div className="flex flex-col items-center gap-6">
                <div className="w-full">
                  <MusicGrid />
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </GridItemProvider>
  );
}