'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { GridData, GridItem } from '@/types/grid';
import { v4 as uuidv4 } from 'uuid';
import { SearchResultItem } from '@/lib/api/lastfm';

interface GridContextType {
  grid: GridData;
  createGrid: (rows: number, columns: number, type: 'artist' | 'album', title: string) => void;
  updateGridItem: (index: number, item: SearchResultItem | null) => void;
  moveGridItem: (sourceIndex: number, destinationIndex: number) => void;
  clearGrid: () => void;
  updateTitle: (title: string) => void;
}

const defaultGrid: GridData = {
  items: [],
  rows: 3,
  columns: 3,
  type: 'artist',
  title: 'My Music Grid'
};

const GridContext = createContext<GridContextType | undefined>(undefined);

export function GridProvider({ children }: { children: ReactNode }) {
  const [grid, setGrid] = useState<GridData>(defaultGrid);

  // Create a new grid
  const createGrid = useCallback((rows: number, columns: number, type: 'artist' | 'album', title: string) => {
    const totalCells = rows * columns;
    const items: GridItem[] = Array.from({ length: totalCells }, () => ({
      id: uuidv4(),
      item: null
    }));

    setGrid({
      items,
      rows,
      columns,
      type,
      title
    });
    
    // We'll let the parent component handle navigation/UI changes
  }, []);

  // Update a specific grid item
  const updateGridItem = useCallback((index: number, item: SearchResultItem | null) => {
    setGrid(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], item };
      return { ...prev, items: newItems };
    });
  }, []);

  // Move an item from one position to another
  const moveGridItem = useCallback((sourceIndex: number, destinationIndex: number) => {
    setGrid(prev => {
      const newItems = [...prev.items];
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(destinationIndex, 0, removed);
      return { ...prev, items: newItems };
    });
  }, []);

  // Clear the entire grid
  const clearGrid = useCallback(() => {
    setGrid(prev => ({
      ...prev,
      items: prev.items.map(item => ({ ...item, item: null }))
    }));
  }, []);

  // Update the grid title
  const updateTitle = useCallback((title: string) => {
    setGrid(prev => ({ ...prev, title }));
  }, []);

  return (
    <GridContext.Provider value={{
      grid,
      createGrid,
      updateGridItem,
      moveGridItem,
      clearGrid,
      updateTitle
    }}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  const context = useContext(GridContext);
  if (context === undefined) {
    throw new Error('useGrid must be used within a GridProvider');
  }
  return context;
}