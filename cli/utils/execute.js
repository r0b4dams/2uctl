import { exec } from 'child_process';

/**
 * TODO: sanitize inputs
 * executes the given command in a new shell with the given arguments
 * @param {string} exe command to run
 * @param  {string[]} args arguments / options for the given command
 * @returns {Promise<void>}
 */
export async function execute(exe, ...args) {
  return new Promise((resolve, reject) => {
    const cmd = [exe, ...args].join(' ');
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}
