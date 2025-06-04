interface Song {
  id: string | number;
  title: string;
  duration: string; // e.g., "3:45"
}

interface Album {
  id: string | number;
  title: string;
  artist: string;
  cover: string;
  songs: Song[];
}

export const generateMockAlbum = (index: number): Album => {
  const songs: Song[] = Array.from({ length: 5 }, (_, i) => ({
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

export const generateMockData = (count: number): Album[] => {
  return Array.from({ length: count }, (_, i) => generateMockAlbum(i + 1));
};
