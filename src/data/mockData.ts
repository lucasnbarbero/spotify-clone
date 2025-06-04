//  src/data/mockData.ts
import type { IAlbum } from '@/types/IAlbum';
import type { ISong } from '@/types/ISong';

export const generateMockAlbum = (index: number): IAlbum => {
  const songs: ISong[] = Array.from({ length: 5 }, (_, i) => ({
    id: `${index}-${i}`,
    title: `Song ${i + 1} of Album ${index}`,
    duration: `${Math.floor(Math.random() * 4 + 2)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`,
  }));

  return {
    id: index,
    title: `Album ${index}`,
    artist: `Artist ${index}`,
    cover: `https://via.placeholder.com/150?text=Album+${index}`,
    songs,
  };
};

export const generateMockData = (count: number): IAlbum[] => {
  return Array.from({ length: count }, (_, i) => generateMockAlbum(i + 1));
};
