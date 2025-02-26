'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useGrid } from './GridContext';

interface GridItemContextType {
  updateGridItem: (row: number, column: number, id: string, image: string, name: string, artist: string) => void;
}

const GridItemContext = createContext<GridItemContextType | undefined>(undefined);

export function GridItemProvider({ children }: { children: ReactNode }) {
  const { grid, updateGridItem: updateGridInContext } = useGrid();

  const updateGridItem = useCallback((row: number, column: number, id: string, image: string, name: string, artist: string) => {
    const index = row * grid.columns + column;
    updateGridInContext(index, {
      id,
      name,
      type: grid.type,
      imageUrl: image,
      artists: grid.type === 'album' ? artist : undefined
    });
  }, [grid.columns, grid.type, updateGridInContext]);

  return (
    <GridItemContext.Provider value={{
      updateGridItem
    }}>
      {children}
    </GridItemContext.Provider>
  );
}

export function useGridItem() {
  const context = useContext(GridItemContext);
  if (context === undefined) {
    throw new Error('useGridItem must be used within a GridItemProvider');
  }
  return context;
}