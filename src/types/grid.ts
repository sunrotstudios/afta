import { SearchResultItem } from "@/lib/api/lastfm";

export interface GridItem {
  id: string;
  item: SearchResultItem | null;
}

export interface GridData {
  items: GridItem[];
  rows: number;
  columns: number;
  type: 'artist' | 'album';
  title: string;
}