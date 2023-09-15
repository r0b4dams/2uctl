async function hasPath(dir, name) {
  const list = await readdir(dir);
  return list.includes(name);
}

async function isRepo() {
  return hasPath(process.cwd(), ".git");
}

async function hasEnv() {
  return hasPath(process.cwd(), ".env");
}

async function hasPackageJson() {
  return hasPath(process.cwd(), "package.json");
}
