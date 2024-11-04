import { exec } from "node:child_process";
import type { PathLike } from "node:fs";
import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config();

const obsidianPath = process.env.OBSIDIAN_PATH + "Development/Books" || "";
/**
 * Asynchronously reads a Kindle notes file, extracts the notes, and either prints them to the console or writes them to an output file.
 *
 * @param path - The path to the Kindle notes file.
 * @param outputFile - A boolean indicating whether to write the notes to an output file. If false, the notes are printed to the console. Default is false.
 * @returns A promise that resolves to the notes as a single string if `outputFile` is false, otherwise void.
 */
export async function prettifyKindleNotes(
  path: PathLike,
  outputFile: boolean = false,
) {
  // Read the file
  const file = await fs.readFile(path, "utf-8");

  const allLines = file.split("\n");
  const notes: string[] = [];
  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].startsWith("==========")) {
      notes.push(allLines[i - 1]);
      notes.push(" ");
      notes.push("---");
    }
  }
  console.log(path.toString().endsWith(".txt"));
  if (outputFile) {
    const regex = /\/(?:.(?!\/))+$/gim;
    const name = path.toString().match(regex)![0]!.replace("/", "");
    await fs.writeFile(name, notes.join("\n"));
  } else {
    console.log(notes.join("\n"));
    return notes.join("\n");
  }
}

/**
 * Stores prettified Kindle notes in an Obsidian vault.
 *
 * This function takes a path to a file containing Kindle notes,
 * prettifies the notes, and writes them to a temporary markdown file.
 * It then executes a shell command to insert a line at the beginning
 * of the file.
 *
 * @param path - The path to the file containing Kindle notes.
 * @param obsidianPath - The path to the Obsidian vault where the notes should be stored.
 * @returns A promise that resolves when the notes have been stored.
 * @requires gnu sed -- if mac install:
 *           brew install gnu-sed
 */
export async function storeInObsidian(path: PathLike) {
  const notes = await prettifyKindleNotes(path);

  if (!notes) return;
  await fs.writeFile("temp.md", notes);
  const regex = /\/(?:.(?!\/))+$/gim;
  const name = path
    .toString()
    .match(regex)![0]!
    .replace("/", "")
    .replace(".txt", "");
  try {
    //const dirPresent = await fs.readdir(`${obsidianPath}/${name}/`);
    const dirPresent = await fs.readdir(`${obsidianPath}`);
    const nameMod =
      name.charAt(0).toUpperCase() + name.slice(1).replaceAll("-", " ");
    if (dirPresent.find((dir) => dir === nameMod)) {
      throw new Error("Directory already exists");
    } else {
      await fs.mkdir(`${obsidianPath}/${nameMod}/`);
      // eslint-disable-next-line
      exec(`sed -i '1i\ # ${nameMod}' temp.md`); // prettier-ignore

      await fs.rename("temp.md", `${obsidianPath}/${nameMod}/${nameMod}.md`);
    }
  } catch (err: any) {
    console.log(err.message);
  }
}

// prettifyKindleNotes(
//   "/Users/benni/benni-projects/cli-node/assets/make-it-stick.txt",
//   true,
// );
await storeInObsidian(
  "/Users/benni/benni-projects/cli-node/assets/make-it-stick.txt",
);
