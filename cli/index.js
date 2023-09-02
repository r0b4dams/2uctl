import { Command } from "commander";
import { env } from "./env.js";
import { VERSION } from "./utils.js";

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
    .action(env.default);

  cli.parse();
}
