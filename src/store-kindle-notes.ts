import { exec } from "node:child_process";
import type { PathLike } from "node:fs";
import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config();

const basePath = import.meta.dirname;
const clipping = `${basePath}/assets/My Clippings.txt`;
const obsidianPath = process.env.OBSIDIAN_PATH + "Development/Books" || "";
let bookTitle = "";
/**
 * Asynchronously reads a Kindle notes file, extracts the notes, and either prints them to the console or writes them to an output file.
 *
 * @param path - The path to the Kindle notes file.
 * @param bookT - The title of the book. Default is an empty string.
 * @param outputFile - A boolean indicating whether to write the notes to an output file. If false, the notes are printed to the console. Default is false.
 * @returns A promise that resolves to the notes as a single string if `outputFile` is false, otherwise void.
 */
export async function prettifyKindleNotes(
  path: PathLike,
  bookT: string,
  outputFile: boolean = false,
) {
  // Read the file
  const file = await fs.readFile(path, "utf-8");

  const allLines = file.split("\n");
  const notes: string[] = [];
  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].toLowerCase().startsWith(bookT.toLowerCase())) {
      bookTitle = allLines[i];
      notes.push(" ");
      // parse the notes having the book title correct and within the same block ==== - kindle format
      while (i < allLines.length && !allLines[i].startsWith("==========")) {
        // avoid empty lines, kindle notes location and book title line, update iteration each time
        if (
          allLines[i].trim() === "" ||
          allLines[i].startsWith("- Your Highlight at location") ||
          allLines[i].startsWith("- Your Highlight on page") ||
          allLines[i].startsWith(bookTitle)
        ) {
          i++;
          continue;
        }
        notes.push(allLines[i]);
        i++;
      }
      notes.push(" ");
      notes.push("---");
    }
  }
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
export async function storeInObsidian(path: PathLike, bookT: string) {
  const notes = await prettifyKindleNotes(path, bookT, false);

  if (!notes) return;
  await fs.writeFile("temp.md", notes);
  // const regex = /\/(?:.(?!\/))+$/gim;
  // const name = path
  //   .toString()
  //   .match(regex)![0]!
  //   .replace("/", "")
  //   .replace(".txt", "");
  try {
    //const dirPresent = await fs.readdir(`${obsidianPath}/${name}/`);
    const dirPresent = await fs.readdir(`${obsidianPath}`);
    const newBookTitle = bookTitle.replace(bookT, `${bookT} |`);
    const nameMod =
      newBookTitle.charAt(0).toUpperCase() +
      newBookTitle.slice(1).replaceAll("-", " ");
    const dirName =
      bookT.charAt(0).toUpperCase() + bookT.slice(1).replaceAll("-", " ");
    if (dirPresent.find((dir) => dir === dirName)) {
      throw new Error("Directory already exists");
    } else {
      await fs.mkdir(`${obsidianPath}/${dirName}/`);
      //exec(`sed -i '1i\ # ${nameMod}' temp.md`); // prettier-ignore
      exec(
        "pnpm run indent:write",
        async () =>
          await fs.rename(
            "temp.md",
            `${obsidianPath}/${dirName}/${nameMod}.md`,
          ),
      );
    }
  } catch (err: any) {
    console.log(err.message);
  }
}

// prettifyKindleNotes(
//   "/Users/benni/benni-projects/cli-node/assets/My Clippings.txt",
//   "make it stick",
//   false,
// );
await storeInObsidian(clipping, "Master Your Time");
