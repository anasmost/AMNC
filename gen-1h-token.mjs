import readline from "readline";
import "dotenv/config";
import jwt from "jsonwebtoken";
import usersData from "./src/data/users.json" assert { type: "json" };
import { EOL } from "os";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `Choose an email from the existing users:

${usersData.map((u) => u.email).join(EOL)}

email: `,
  (email) => {
    email ||= usersData[0].email;

    const token = jwt.sign(
      {
        sub: email,
        iat: Date.now() / 1000,
        iss: "localhost",
        aud: "localhost",
        exp: Date.now() / 1000 + 60 * 60,
      },
      process.env.JWT_SECRET
    );

    console.info(token);

    rl.close();
  }
);
