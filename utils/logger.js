import chalk from "chalk";

const prefix = () => chalk.blue("[askbcs]");

export const logger = {
  ok(...args) {
    console.log(prefix(), chalk.green("[ok]"), ...args);
  },
  info(...args) {
    console.log(prefix(), chalk.magenta("[info]"), ...args);
  },
  warn(...args) {
    console.log(prefix(), chalk.yellow("[warning]"), ...args);
  },
  err(...args) {
    console.log(prefix(), chalk.red("[error]"), ...args);
  },
};
