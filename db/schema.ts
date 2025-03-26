import { sqliteTable, integer, text, real, blob } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const Film = sqliteTable('FILM', {
  uidFilm: integer('UIDFILM').primaryKey({ autoIncrement: true }),
  name: text('NAME').notNull(),
  iso: integer('ISO').notNull(),
  exposures: integer('EXPOSURES').notNull(),
  status: text('STATUS').notNull(),
  expiration: integer('EXPIRATION', { mode: 'timestamp' }),
  developedAt: integer('DEVELOPEDAT', { mode: 'timestamp' })
});

export const FilmSession = sqliteTable("FILMSESSION", {
  uidFilmSession: integer('UIDFILMSESSION').primaryKey({ autoIncrement: true }),
  active: integer('ACTIVE', { mode: 'boolean' }).notNull(),
  notes: text('NOTES'),
  uidFilm: integer('UIDFILM').notNull().references(() => Film.uidFilm),
  uidCamera: integer('UIDCAMERA').notNull().references(() => Camera.uidCamera)
});

export const Camera = sqliteTable('CAMERA', {
  uidCamera: integer('UIDCAMERA').primaryKey({ autoIncrement: true }),
  name: text('NAME').notNull(),
  notes: text('NOTES')
});

export const Lens = sqliteTable('LENS', {
  uidLens: integer('UIDLENS').primaryKey({ autoIncrement: true }),
  name: text('NAME').notNull(),
  notes: text('NOTES')
});

export const FilmLog = sqliteTable('FILMLOG', {
  uidLog: integer('UIDLOG').primaryKey({ autoIncrement: true }),
  shutterSpeed: integer('SHUTTERSPEED').notNull(),
  aperture: real('APERTURE').notNull(),
  notes: text('NOTES'),
  timestamp: integer('TIMESTAMP', { mode: 'timestamp' }),
  digitalPhoto: blob('DIGITALPHOTO'),
  filmPhoto: blob('FILMPHOTO'),
  uidLens: integer('UIDLENS').notNull().references(() => Lens.uidLens),
  uidFilmSession: integer('UIDFILMSESSION').notNull().references(() => FilmSession.uidFilmSession)
});

export const FilmRelations = relations(Film, ({ many }) => ({
  sessions: many(FilmSession)
}));

export const CameraRelations = relations(Camera, ({ many }) => ({
  sessions: many(FilmSession)
}));

export const LensRelations = relations(Lens, ({ many }) => ({
  logs: many(FilmLog)
}));

export const FilmSessionRelations = relations(FilmSession, ({ one, many }) => ({
  film: one(Film, {
    fields: [FilmSession.uidFilm],
    references: [Film.uidFilm]
  }),
  camera: one(Camera, {
    fields: [FilmSession.uidCamera],
    references: [Camera.uidCamera]
  }),
  logs: many(FilmLog)
}));

export const FilmLogRelations = relations(FilmLog, ({ one }) => ({
  session: one(FilmSession, {
    fields: [FilmLog.uidFilmSession],
    references: [FilmSession.uidFilmSession]
  }),
  lens: one(Lens, {
    fields: [FilmLog.uidLens],
    references: [Lens.uidLens]
  })
}));

export type Camera = typeof Camera.$inferSelect;
export type FilmSession = typeof FilmSession.$inferSelect;