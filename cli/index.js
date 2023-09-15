import { Command, Option } from "commander";
import { env } from "./commands/index.js";
import { collect, logger, version } from "../utils/index.js";

try {
  const program = new Command();

  program
    .name("askbcs")
    .description("A CLI to help automate stuff")
    .version(version);

  program
    .command("env")
    .action(env)
    .description("Generate a .env file")
    .argument("[keyval...]", "optional list of env vars", collect, [])
    .option("-u, --user <user>", "specify username")
    .option("-p, --password [password]", "specify password")
    .addOption(
      new Option(
        "-m, --module <module>",
        "setup dev env for modules 12, 13, 14"
      ).choices(["12", "13", "14"])
    );

  program.parse();
} catch (error) {
  logger.error(error.message);
}
