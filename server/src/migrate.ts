import { runMigrations, sql } from "./db.js";

async function main() {
  console.log("Running migrations...");
  await runMigrations();
  console.log("Migrations complete.");
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
