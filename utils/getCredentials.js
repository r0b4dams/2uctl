import { default_username, default_password } from "../utils/defaults.js";

/**
 * prompts for a mysql username and password
 * @param {readline.Interface} io readline interface to handle user input
 * @returns {Promise<[string, string]>} a tuple containing a mysql username and password
 */
export async function getCredentials() {
  const { io } = await import("../utils/io.js");

  let un = await io.ask(`Enter mysql username (${default_username}): `);
  if (!un) {
    un = default_username;
  }
  let pw = await io.ask(`Enter mysql password (${default_password}): `);
  if (!pw) {
    pw = default_password;
  }

  io.close();
  return [un, pw];
}
