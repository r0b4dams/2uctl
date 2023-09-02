import { open, appendFile } from "fs/promises";
import { Command } from "commander";

import { logger } from "./logger.js";
import { ENV, PATH, VERSION } from "./utils.js";

const cli = new Command();

export function main() {
  cli
    .name("2uctl")
    .description("A CLI to help automate stuff")
    .version(VERSION);

  cli
    .command("env")
    .description(
      "Generate a boilerplate .env file with a default configuration"
    )
    .action(async () => {
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
    });

  cli.parse();
}
