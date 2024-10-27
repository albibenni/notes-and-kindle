import { execSync } from "child_process";
import { describe, it, expect } from "vitest";

describe("index.ts", () => {
  it('should log "hello note" to the console', () => {
    const output = execSync(
      "node --experimental-strip-types index.ts",
    ).toString();
    expect(output).toBe("hello note\n");
  });
});
