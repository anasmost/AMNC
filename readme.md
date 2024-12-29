## Important Notes

---

### 1. Node Version

This project was built on **Node v20**. It has not been tested on other versions.

### 2. Build Command

The build command uses the `cp` command. If you are on Windows, use a Linux-style terminal like **Git Bash** to run it.

### 3. Launch Process

Execute the following commands in the root folder of the project:

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Launch in Development mode:

   ```sh
   pnpm start
   ```

3. Obtain a JWT token:

   ```sh
   pnpm get:token
   ```

   Choose an email from the provided output and use the token to test the API with your preferred client.

4. To test the build:
   ```sh
   pnpm build
   ```
   Then start the built server using:
   ```sh
   node .
   ```
