import { Command } from "commander";
import { env } from "./env.js";
import { semver } from "./version.js";

const program = new Command();

program
  .name("askbcs")
  .description("A CLI to help automate stuff")
  .version(semver);

program
  .command("env")
  .description("Generate a boilerplate .env file")
  .action(env.default);

program.parse();
