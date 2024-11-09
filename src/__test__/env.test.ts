import { describe, beforeEach, expect, it, vi } from "vitest";

describe("env variables", () => {
  beforeEach(() => {
    vi.resetModules(); // Most important - it clears the cache
    vi.resetAllMocks();
  });

  it("should have a default DB_PATH", () => {
    const DB_PATH = process.env.DB_PATH;
    expect(DB_PATH).toBeDefined();
    expect(DB_PATH).toBe(
      "/Users/benni/benni-projects/SecondBrain/QuickNotes/db.json",
    );
  });
});
