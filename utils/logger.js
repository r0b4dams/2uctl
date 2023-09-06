import chalk from "chalk";

export const logger = {
  ok(msg) {
    console.log(chalk.green("[OK]"), msg);
  },
  err(msg) {
    console.log(chalk.red("[ERR]"), msg);
  },
};
