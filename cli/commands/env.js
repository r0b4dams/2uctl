import { open, appendFile } from "fs/promises";

const default_username = "root";
const default_password = "password";

// defaults
const ENV = {
  // sequelize
  DB_NAME: "ecommerce_db", // m13
  DB_USER: default_username,
  DB_USERNAME: default_username,
  DB_PASS: default_password,
  DB_PASSWORD: default_password,
  DB_PW: default_password,
};

export function env(vars, _options) {
  if (vars.length > 0) {
    vars.forEach((keyval) => {
      const [key, val] = keyval.split("=");
      ENV[key] = val;

      // update fallbacks
      if (key === "DB_USER" || key === "DB_USERNAME") {
        key === "DB_USER" ? (ENV.DB_USERNAME = val) : (ENV.DB_USER = val);
      }
      if (key === "DB_PASS" || key === "DB_PASSWORD") {
        key === "DB_PASS" ? (ENV.DB_PASSWORD = val) : (ENV.DB_PASS = val);
      }
    });
  }
  write(".env");
}

async function write(path) {
  const fileHandle = await open(path, "w");
  for (const [key, val] of Object.entries(ENV)) {
    await appendFile(path, `${key}="${val}"\n`, "utf8");
  }
  await fileHandle.close();
}
