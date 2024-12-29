import { Request, Response } from "express";
import type { Note } from "./data/notes.json";
import { NoteModel } from "./notes.model";
import type { NoteDto, NoteParams } from "./notes.types";

export class NoteController {
  static getNoteById(req: Request<NoteParams>, res: Response<Note>): Response<Note> {
    const note = NoteModel.findNoteById(+req.params.id);
    return res.status(note ? 200 : 404).json(note);
  }

  static createNote(req: Request<unknown, Note, NoteDto>, res: Response<Note>): Response<Note> {
    const note = NoteModel.addNote({
      ...req.body,
      title: req.body.title ?? "",
      content: req.body.content ?? "",
      tags: req.body.tags ?? [],
    });

    return res.status(201).json(note);
  }

  static deleteNoteById(req: Request<NoteParams, unknown, void>, res: Response<void>): Response<void> {
    const note = NoteModel.deleteNoteById(+req.params.id);
    return res.status(note ? 204 : 404).end();
  }
}
