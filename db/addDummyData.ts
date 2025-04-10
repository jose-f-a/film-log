import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from 'expo-sqlite/kv-store';
import { Camera, Film, FilmLog, FilmSession, Lens } from "./schema";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  // const value = AsyncStorage.getItemSync('dbInitialized');
  // if (value) return;

  console.log('Inserting Cameras');
  await db.insert(Camera).values([
    { name: 'Canon AE-1', notes: 'This is a note' },
    { name: 'Minolta X-300' },
    { name: 'Minolta X-500' }
  ]);

  
  await db.insert(Lens).values([
    { uidLens: 1, name: 'Rokkor 50mm f/1.8', notes: 'This is a note' },
    { uidLens: 2, name: 'Minolta 28mm f/2.8' },
    { uidLens: 3, name: 'Minolta 135mm f/2.8' }
  ]);

  
  await db.insert(Film).values([
    { uidFilm: 1, name: 'Kodak Gold 200', iso: 200, exposures: 24, expiration: new Date("2025-12-31T23:59:59Z"), developedAt: null, status: 'unused'},
    { uidFilm: 2, name: 'Kodak Tri-X 400', iso: 400, exposures: 36, expiration: new Date("2025-12-31T23:59:59Z"), developedAt: null, status: 'using' },
  ]);

  
  await db.insert(FilmSession).values([
    { uidFilmSession: 1, active: true, notes: 'This is a note', uidFilm: 1, uidCamera: 1 },
    { uidFilmSession: 2, active: false, uidFilm: 2, uidCamera: 2 }
  ]);

  
  await db.insert(FilmLog).values([
    { uidLog: 1, shutterSpeed: 500, aperture: 2.8, notes: 'This is a note', timestamp: new Date(), digitalPhoto: null, filmPhoto: null, uidLens: 1, uidFilmSession: 1 },
    { uidLog: 1, shutterSpeed: 500, aperture: 2.8, notes: 'This is a note', timestamp: new Date(), digitalPhoto: null, filmPhoto: null, uidLens: 2, uidFilmSession: 1 },
    { uidLog: 1, shutterSpeed: 60, aperture: 16, notes: 'This is a note', timestamp: new Date(), digitalPhoto: null, filmPhoto: null, uidLens: 2, uidFilmSession: 1 },
    { uidLog: 2, shutterSpeed: 1000, aperture: 4, timestamp: new Date(), digitalPhoto: null, filmPhoto: null, uidLens: 2, uidFilmSession: 2 }
  ]);
}