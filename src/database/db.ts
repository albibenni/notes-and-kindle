import fs from "node:fs/promises";
import type { DB, Note } from "../types/type.js";

const DB_PATH =
  process.env.DB_PATH ||
  "/Users/benni/benni-projects/SecondBrain/Resources/QuickNotes/db.json";

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(db);
};

export const saveDB = async (db: DB) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const createMDFile = async (note: Note) => {
  const path = `${process.env.NOTES_PATH}/${note.noteName}.md`;
  await fs.writeFile(path, note.content);
  console.log(`Note saved to ${path}`);
};

export const insertDB = async (note: Note) => {
  try {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    await createMDFile(note);
    return note;
  } catch (e: any) {
    console.error(e.message);
  }
};
