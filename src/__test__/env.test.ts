import { jest, describe, beforeEach, expect, it } from "@jest/globals";

describe("env variables", () => {
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    jest.resetAllMocks();
  });

  it("should have a default DB_PATH", () => {
    const DB_PATH = process.env.DB_PATH;
    expect(DB_PATH).toBeDefined();
    expect(DB_PATH).toBe(
      "/Users/benni/benni-projects/ObsidianVault/QuickNotes/db.json",
    );
  });
});
