import { describe, vi, beforeEach, afterEach, it, expect } from "vitest";
import { getAllNotes, newNote, removeNote } from "../database/note.js";
import { getDB, insertDB, saveDB } from "../database/db.js";
import type { DB } from "../types/type.js";

vi.mock("../database/db.js");
describe("Note functions", () => {
  afterEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
  });
  beforeEach(() => {
    vi.mock("../database/db.js");
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
    vi.mocked(insertDB).mockResolvedValue(data);

    const result = await newNote(note, tags);
    expect(result.content).toEqual(data.content);
    expect(result.tags).toEqual(data.tags);
    expect(result.id).toEqual(data.id);
  });

  it("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };
    vi.mocked(getDB).mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  it("removeNote ", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];

    vi.mocked(saveDB).mockResolvedValue({ notes: notes } as DB);
    vi.mocked(getDB).mockResolvedValue({ notes: notes } as DB);

    const idToRemove = 3;
    const result = await removeNote(idToRemove);
    expect(result).toBe(idToRemove);
  });

  it("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];

    vi.mocked(saveDB).mockResolvedValue({ notes: notes } as DB);
    vi.mocked(getDB).mockResolvedValue({ notes: notes } as DB);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});
