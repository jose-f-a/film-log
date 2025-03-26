import { drizzle } from "drizzle-orm/expo-sqlite";
import {openDatabaseSync}  from "expo-sqlite";
import { FilmSession } from "./schema";
import { eq } from "drizzle-orm";

export const DATABASENAME = 'filmlog.db';

const expoDb = openDatabaseSync(DATABASENAME);
export const db = drizzle(expoDb);

//Function that gets all columns from the FilmSession table where the active column is true
export async function getActiveSessions(active: boolean) {
  return db.select().from(FilmSession).where(eq(FilmSession.active, active));
};