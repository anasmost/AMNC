import "dotenv/config";
import express from "express";
import { AddressInfo } from "node:net";
import noteRouter from "./notes.api";
import assert from "node:assert";

assert(process.env.JWT_SECRET, `jwt secret is not set in .env file`);

const app = express();
app.use("/notes", noteRouter);

const server = app.listen(+(process.env.PORT || 0), "127.0.0.1", 5);

server.on("listening", () => {
  const { address, port } = server.address() as AddressInfo;
  console.info(`Server HTTP is listening on address: ${address}:${port}`);
});
