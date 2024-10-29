import fs from "node:fs/promises";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const DB_PATH = process.env.DB_PATH;

export const getDB = async () => {
  if (DB_PATH == undefined) throw new Error("Env variable db not found");
  const db = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(db);
};

export const saveDB = async (db: string) => {
  if (DB_PATH == undefined) throw new Error("Env variable db not found");
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (note: string) => {
  try {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
  } catch (e: any) {
    console.error(e.message);
  }
};
