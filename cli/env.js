import { open, appendFile } from "fs/promises";
import { logger } from "./logger.js";

export const FILE = ".env";

const ENV = {
  DB_NAME: "ecommerce_db",
  DB_USER: "root",
  DB_PASS: "password",
  // fallback var names
  DB_USERNAME: "root",
  DB_PASSWORD: "password",
};

export const env = {
  async default() {
    try {
      const fileHandle = await open(FILE, "w");
      for (const [key, val] of Object.entries(ENV)) {
        await appendFile(FILE, `${key}="${val}"\n`);
      }
      await fileHandle.close();
      logger.ok(".env generated");
    } catch (error) {
      logger.err(error.message);
    }
  },
};
