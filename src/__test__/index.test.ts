import { execSync } from "child_process";
import { describe, it, expect } from "@jest/globals";

// jest.unstable_mockModule(".", () => ({
//   default: jest.fn().mockImplementation(() => "Hello, Mock!"),
//   namedExport: jest.fn().mockImplementation(() => "Hello, Mock namedExport!"),
// }));
// const index = await import("../src/index");

describe("CLI Node Script", () => {
  // it('should log "hello note"', () => {
  //   const output = execSync(
  //     "node --experimental-strip-types ./src/index.ts",
  //   ).toString();
  //   expect(output).toContain("hello note");
  // });

  it("should execute with error no command provided", () => {
    expect(() =>
      execSync("node --experimental-strip-types ./src/index.ts"),
    ).toThrow();
  });

  // it("should import command module without errors", () => {
  //   const output = execSync("node -e \"require('./src/index.ts')\"").toString();
  //   expect(output).toContain("hello note");
  // });

  // it("should not log any additional unexpected output", () => {
  //   const output = execSync("node ./src/index.ts").toString();
  //   expect(output.trim()).toBe("hello note");
  // });
});
