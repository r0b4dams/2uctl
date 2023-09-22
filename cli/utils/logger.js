import chalk from 'chalk';

const prefix = () => chalk.blue('[bcs]');

export const logger = {
  debug(...args) {
    console.log(prefix(), chalk.cyan('[debug]'), ...args);
  },
  info(...args) {
    console.log(prefix(), chalk.green('[info]'), ...args);
  },
  error(...args) {
    console.log(prefix(), chalk.red('[error]'), ...args);
  },
  warn(...args) {
    console.log(prefix(), chalk.yellow('[warn]'), ...args);
  },
  trace(...args) {
    console.log(prefix(), chalk.gray('[trace]'), ...args);
  },
  init(...args) {
    console.log(prefix(), chalk.cyan('[init]'), ...args);
  },
};
