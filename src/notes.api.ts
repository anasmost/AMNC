import { NextFunction, Request, Response, Router } from "express";
import { NoteController } from "./notes.controllers";
import { NoteMiddlewares } from "./notes.middlewares";

const noteRouter: Router = Router()
  .use(NoteMiddlewares.auth)
  .get("/:id", NoteMiddlewares.validateRequest, NoteController.getNoteById)
  .post("/", NoteMiddlewares.validateRequest, NoteController.createNote)
  .delete("/:id", NoteMiddlewares.validateRequest, NoteController.deleteNoteById)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(400).json({ message: err.message });
  });

export default noteRouter;
