import { describe, jest, beforeEach, it, expect } from "@jest/globals";

jest.unstable_mockModule("../database/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../database/db.js");
const { newNote, getAllNotes, removeNote } = await import(
  "../database/note.js"
);

describe("Note functions", () => {
  beforeEach(() => {
    //@ts-ignore
    insertDB.mockClear();
    //@ts-ignore
    getDB.mockClear();
    //@ts-ignore
    saveDB.mockClear();
  });

  it("newNote inserts data and returns it", async () => {
    const note = "it note";
    const tags = ["tag1", "tag2"];
    const id = Date.now();
    const data = {
      tags,
      content: note,
      id,
    };
    //@ts-ignore
    insertDB.mockResolvedValue(data);

    const result = await newNote(note, tags);
    expect(result.content).toEqual(data.content);
    expect(result.tags).toEqual(data.tags);
    expect(result.id).toEqual(data.id);
  });

  it("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };
    //@ts-ignore
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  it("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    //@ts-ignore
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});
