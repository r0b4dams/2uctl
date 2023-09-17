import { exec } from "child_process";

/**
 * searches the given file to find SQL database name
 * @param {string} path path of the file to scan
 * @returns {Promise<string>} Promise that resolves to the database name
 */
export async function getDB(path) {
  return new Promise((resolve, reject) => {
    exec(`cat ${path} | grep -m 1 "^CREATE DATABASE"`, (error, stdout) => {
      if (error) {
        reject(error);
      }

      const result = stdout
        .replace("CREATE DATABASE", "")
        .replace(";", "")
        .trim();

      if (!result) {
        reject(new Error("database name not found"));
      }
      resolve(result);
    });
  });
}
