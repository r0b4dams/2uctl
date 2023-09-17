import { logger } from "../../utils/logger.js";
import { execute } from "../../utils/execute.js";

// install deps via npm script
export async function npmInstall() {
  logger.info("installing dependencies...");
  await execute("npm install");
  logger.info("dependencies installed!");
}
