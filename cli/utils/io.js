import readline from 'readline/promises';
import chalk from 'chalk';

/**
 * caution: this module is currently experimental
 * https://nodejs.org/api/readline.html#promises-api
 */
export const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * helper to add formatting to stdout
 * @param {string} question
 * @returns {Promise<string>} user input
 */
io.ask = async (question) => {
  return io.question(`${chalk.blue('[bcs]')} ${chalk.magenta('[ask]')} ${question}`);
};
