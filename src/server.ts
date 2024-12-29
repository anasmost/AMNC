import "dotenv/config";
import express from "express";
import { AddressInfo } from "node:net";
import noteRouter from "./notes.api";
import assert from "node:assert";

assert(process.env.JWT_SECRET, `jwt secret is not set in .env file`);

const app = express();
app.use(express.json());
app.use("/notes", noteRouter);

const server = app.listen(+(process.env.PORT || 0), "localhost", 5);

server.on("listening", () => {
  console.log(`Server is listening on port: ${(server.address() as AddressInfo).port}`);
});
