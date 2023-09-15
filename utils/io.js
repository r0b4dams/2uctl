// caution: this module is currently experimental
// https://nodejs.org/api/readline.html#promises-api
import readline from "readline/promises";
import chalk from "chalk";

export const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

io.ask = async (question) =>
  io.question(`${chalk.blue("[askbcs]")} ${chalk.cyan("[ask]")} ${question}`);
