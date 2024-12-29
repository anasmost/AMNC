import type { Note } from "./data/notes.json";

export interface NoteParams {
  id: string;
}

export type NoteDto = Pick<Note, "title" | "content"> & Partial<Pick<Note, "tags">>;
