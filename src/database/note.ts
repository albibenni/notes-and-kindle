import { insertDB, getDB, saveDB } from "./db.js";
import type { Note } from "../types/type.js";

export const newNote = async (
  noteName: string,
  note: string,
  tags: string[],
) => {
  const newNote: Note = {
    tags,
    content: note,
    noteName: noteName,
    id: Date.now(),
  };
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter: string) => {
  const notes = await getAllNotes();
  return notes.filter((note: Note) =>
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const removeNote = async (id: number) => {
  const notes = await getAllNotes();
  const match = notes.find((note: Note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note: Note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
