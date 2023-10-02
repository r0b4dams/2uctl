/**
 * helper to concat new line to sql statement
 * @param {string} cmd
 * @returns {string}
 */
export function sql(cmd) {
  return `${cmd}\n`;
}
