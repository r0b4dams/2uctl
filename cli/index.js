import { Command } from "commander";
import { generateEnv } from "./env.js";
import { collect, logger, version } from "../utils/index.js";

const program = new Command();

program
  .name("askbcs")
  .description("A CLI to help automate stuff")
  .version(version);

program
  .command("env")
  .description("Generate a .env file")
  .argument("[keyval...]", "optionally set env vars", collect, [])
  .action(generateEnv)
  .hook("postAction", () => logger.ok(".env generated"));

try {
  program.parse();
} catch (error) {
  logger.err(error.message);
}
