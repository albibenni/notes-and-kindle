import { promises as fs } from "node:fs";
import { getDB } from "../database/db.js";
import type { DB } from "../types/type.ts";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";

jest.mock("node:fs/promises");

const mockDB: DB = { notes: [] };
//const mockNote: Note = { id: 1, content: "Test note", tags: ["tag1", "tag2"] };

describe("Database functions", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it("getDB should read and parse the database file", async () => {
    //(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockDB));
    jest.spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(mockDB));

    const db = await getDB();

    expect(fs.readFile).toHaveBeenCalledWith(process.env.DB_PATH, "utf8");
    expect(db).toEqual(mockDB);
  });

  //   test("saveDB should write the database to the file", async () => {
  //     await saveDB(mockDB);

  //     expect(fs.writeFile).toHaveBeenCalledWith(
  //       "/Users/benni/benni-projects/ObsidianVault/QuickNotes/db.json",
  //       JSON.stringify(mockDB, null, 2),
  //     );
  //   });

  //   test("insertDB should add a note to the database and save it", async () => {
  //     (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockDB));
  //     (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

  //     const note = await insertDB(mockNote);

  //     expect(fs.readFile).toHaveBeenCalledWith(
  //       "/Users/benni/benni-projects/ObsidianVault/QuickNotes/db.json",
  //       "utf8",
  //     );
  //     expect(fs.writeFile).toHaveBeenCalledWith(
  //       "/Users/benni/benni-projects/ObsidianVault/QuickNotes/db.json",
  //       JSON.stringify({ notes: [mockNote] }, null, 2),
  //     );
  //     expect(note).toEqual(mockNote);
  //   });

  //   test("insertDB should handle errors", async () => {
  //     const consoleErrorSpy = jest
  //       .spyOn(console, "error")
  //       .mockImplementation(() => {});
  //     (fs.readFile as jest.Mock).mockRejectedValue(new Error("File read error"));

  //     await insertDB(mockNote);

  //     expect(consoleErrorSpy).toHaveBeenCalledWith("File read error");
  //     consoleErrorSpy.mockRestore();
  //   });
});
