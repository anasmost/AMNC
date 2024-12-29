import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import assert from "node:assert";
import usersData from "./data/users.json";
import type { NoteDto, NoteParams } from "./notes.types";

export class NoteMiddlewares {
  private static readonly users = usersData;

  static auth(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization) {
        const userPayload = jwt.verify(
          req.headers.authorization!.match(/^bearer\s(.+)/i)![1],
          process.env.JWT_SECRET!,
          {
            issuer: "localhost",
            audience: "localhost",
          }
        ) as JwtPayload;

        if (NoteMiddlewares.users.some((u) => u.email === userPayload.sub)) return next();
        throw new Error("Unauthorized");
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }

  static validateRequest(
    req: Request<Partial<NoteParams>, unknown, NoteDto | void>,
    _res: Response,
    next: NextFunction
  ) {
    try {
      // Id must be numerical
      if (req.method === "GET") assert(/^\d+$/.test(req.params?.id ?? ""), `Invalid note id #${req.params?.id}`);
      // Title and content are mandatory
      if (req.method === "POST")
        assert(
          req.body?.title !== undefined && req.body?.content !== undefined,
          `both title and content fields must be set`
        );

      next();
    } catch (error) {
      next(error);
    }
  }
}
