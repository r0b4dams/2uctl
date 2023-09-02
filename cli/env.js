import { open, appendFile } from "fs/promises";
import { logger } from "./logger.js";
import { ENV, PATH } from "./utils.js";

export const env = {
  async default() {
    try {
      const fileHandle = await open(PATH, "w");
      for (const [key, val] of Object.entries(ENV)) {
        await appendFile(PATH, `${key}="${val}"\n`);
      }
      await fileHandle.close();
      logger.ok(".env generated");
    } catch (error) {
      logger.err(error.message);
    }
  },
};
