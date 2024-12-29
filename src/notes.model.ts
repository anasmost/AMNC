import { writeFile } from "fs/promises";
import { join } from "path";
import type { Note } from "./data/notes.json";
import notesData from "./data/notes.json";
import { NoteDto } from "./notes.types";

export class NoteModel {
  private static readonly notes = notesData;
  private static isDirty: boolean = false;

  static {
    setInterval(() => {
      this.commitNotes();
    }, 5000);

    process.on("SIGINT", this.commitNotes.bind(this));
  }

  private static async commitNotes() {
    if (this.isDirty) {
      await writeFile(join(__dirname, "./data/notes.json"), JSON.stringify(this.notes, null, "\t"));
      this.isDirty = false;
    }
  }

  static findNoteById(id: number): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  static addNote(noteDto: NoteDto): Note {
    const note = {
      id: this.notes.length + 1,
      ...noteDto,
      tags: [],
      created: new Date(),
    };

    this.notes.push(note);
    this.isDirty = true;
    return note;
  }

  static deleteNoteById(id: number): Note | undefined {
    const noteIndex = this.notes.findIndex((n) => n.id === id);

    if (noteIndex > -1) {
      const note = this.notes.splice(noteIndex, 1)[0];
      this.isDirty = true;
      return note;
    }
  }
}
