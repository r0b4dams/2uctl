import readline from "readline/promises";
import chalk from "chalk";

/**
 * caution: this module is currently experimental
 * https://nodejs.org/api/readline.html#promises-api
 */
export const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// wrapper to add stdout formatting
io.ask = async (question) => {
  return io.question(
    `${chalk.blue("[bcs]")} ${chalk.magenta("[ask]")} ${question}`
  );
};
