/**
 * Prüft, ob alle Peer-Dependencies von @iobroker/eslint-config
 * in unserer package.json stehen. So siehst du "fehlende Deps" lokal,
 * ohne npm ci / Docker / WSL – bevor GitHub-CI fehlschlägt.
 *
 * Liste entspricht @iobroker/eslint-config@2.2.0 (bei Upgrade ggf. anpassen).
 */
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUR_PKG = path.join(ROOT, "package.json");

// Peer-Dependencies von @iobroker/eslint-config (npm-Registry / package.json)
const REQUIRED_PEERS = new Set([
  "eslint",
  "globals",
  "prettier",
  "@eslint/js",
  "@eslint/eslintrc",
  "typescript-eslint",
  "eslint-plugin-jsdoc",
  "eslint-plugin-react",
  "eslint-plugin-import",
  "eslint-plugin-unicorn",
  "eslint-config-prettier",
  "eslint-plugin-prettier",
  "@typescript-eslint/parser",
  "eslint-plugin-react-hooks",
  "@typescript-eslint/eslint-plugin",
]);

const pkg = JSON.parse(fs.readFileSync(OUR_PKG, "utf8"));
const deps = {
  ...(pkg.dependencies || {}),
  ...(pkg.devDependencies || {}),
};
const ourPackages = new Set(Object.keys(deps));

const missing = [...REQUIRED_PEERS].filter((name) => !ourPackages.has(name));

if (missing.length > 0) {
  console.error(
    "check-eslint-peer-deps: Folgende Pakete werden von @iobroker/eslint-config benötigt,\n" +
      "sind aber nicht in package.json (dependencies/devDependencies).\n" +
      "Ohne sie schlägt der Lint-Job auf GitHub (npm ci) fehl.\n"
  );
  missing.forEach((name) => console.error("  - " + name));
  console.error("\nBitte als devDependencies in package.json eintragen und npm install ausführen.");
  process.exit(1);
}
