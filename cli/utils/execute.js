import { exec } from "child_process";

// TODO: sanitize inputs
export async function execute(exe, ...args) {
  return new Promise((resolve, reject) => {
    const cmd = [exe, ...args].join(" ");
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}
