import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from "../database/note.js";
import type { ArgumentsCamelCase } from "yargs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { Note } from "../types/type.ts";
import { start } from "../server.js";

function isString(value: any): value is string {
  return typeof value === "string";
}

export const listNotes = (notes: Note[]) => {
  notes.forEach((note) => {
    console.log("\n");
    console.log("id: ", note.id);
    console.log("tags: ", note.tags.join(", "));
    console.log("note: ", note.content);
  });
};

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        describe: "The content of the note you want to create",
        type: "string",
      });
    },

    async (argv: ArgumentsCamelCase) => {
      if (!isString(argv.note) || !argv.note) {
        console.log("Please provide a note");
        return;
      }
      const tags = isString(argv.tags) ? argv.tags.split(",") : [];
      const filename = isString(argv.name) ? argv.name : Date.now().toString();
      const content = argv.note;
      const note = await newNote(filename, content, tags);
      console.log("Note added!", note.id);
    },
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const notes = await getAllNotes();
      listNotes(notes);
    },
  )

  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      if (!argv.filter) return;
      const matches = await findNotes(argv.filter);
      listNotes(matches);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      if (!argv.id) return;
      const id = await removeNote(argv.id);
      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
    },
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getAllNotes();
      start(notes, argv.port);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async () => {
      await removeAllNotes();
      console.log("All notes removed");
    },
  )
  .demandCommand(1)
  .parse();
