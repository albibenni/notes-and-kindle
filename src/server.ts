import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import type { Note } from "./types/type.js";

export const interpolate = (html: string, data: any) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, placeholder) => {
    return data[placeholder] || "";
  });
};

export const formatNotes = (notes: Note[]) => {
  return notes
    .map((note) => {
      return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    })
    .join("\n");
};

export const createServer = (notes: Note[]) => {
  return http.createServer(async (_, res) => {
    const HTML_PATH = new URL("../template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes: Note[], port: number) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};
