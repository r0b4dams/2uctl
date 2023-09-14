// caution: this module is currently experimental
// https://nodejs.org/api/readline.html#promises-api
import readline from "readline/promises";
import chalk from "chalk";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.ask = async (question) =>
  rl.question(
    `${chalk.blue("[askbcs]")} ${chalk.cyan("[ask]")} ${question}`
  );
