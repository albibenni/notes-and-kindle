import type { Note } from "src/types/type.js";
import { getAllNotes, newNote } from "../database/note.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const listNotes = (notes: Note[]) => {
  notes.forEach((note) => {
    console.log("\n");
    console.log("id: ", note.id);
    console.log("tags: ", note.tags.join(", ")),
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

    async (argv) => {
      const tags = typeof argv.tags === "string" ? argv.tags.split(",") : [];
      console.log(argv.tags);
      const note = await newNote(argv.note || "", tags);
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
      console.log(argv.note);
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
      console.log(argv.note);
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
      console.log(argv.note);
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      console.log(argv.note);
    },
  )
  .demandCommand(1)
  .parse();