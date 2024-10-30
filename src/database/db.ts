import fs from "node:fs/promises";
import type { DB, Note } from "../types/type.js";

const DB_PATH =
  process.env.DB_PATH ||
  "/Users/benni/benni-projects/ObsidianVault/QuickNotes/db.json";

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(db);
};

export const saveDB = async (db: DB) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (note: Note) => {
  try {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
  } catch (e: any) {
    console.error(e.message);
  }
};
