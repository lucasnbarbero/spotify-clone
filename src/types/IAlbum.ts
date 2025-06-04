//  src/types/IAlbum.ts
import type { ISong } from './ISong';

export interface IAlbum {
  id: string | number;
  title: string;
  artist: string;
  cover: string;
  songs: ISong[];
}
