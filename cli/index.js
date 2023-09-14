import { Command } from "commander";
import { env, setup } from "./commands/index.js";
import { collect, logger, version } from "../utils/index.js";

try {
  const program = new Command();

  program
    .name("askbcs")
    .description("A CLI to help automate stuff")
    .version(version);

  program
    .command("env")
    .description("Generate a .env file")
    .argument("[keyval...]", "optional list of env vars", collect, [])
    .action(env)
    .hook("postAction", () => logger.ok(".env generated"));

  program
    .command("setup")
    .description("setup a module challenge environment")
    .argument("<module>")
    .action(setup);

  program.parse();
} catch (error) {
  logger.err(error.message);
}
