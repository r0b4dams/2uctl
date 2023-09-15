import { exec } from "child_process";

import { logger } from "./logger.js";

// TODO: sanitize inputs
export async function execute(exe, ...args) {
  return new Promise((resolve, reject) => {
    const cmd = [exe, ...args].join(" ");
    exec(cmd, (error, stdout) => {
      if (error) {
        logger.error(error.message.trim());
        reject(error);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}
