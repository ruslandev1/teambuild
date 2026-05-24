import postgres from "postgres";
import { env } from "./env.js";
import { defaultSiteContent } from "../../shared/defaultSiteContent.js";
import type { SiteContent } from "../../shared/siteContent.js";

export const sql = postgres(env.databaseUrl);

export async function runMigrations(): Promise<void> {
  const migrationPath = new URL("../migrations/001_init.sql", import.meta.url);
  const fs = await import("node:fs/promises");
  const migrationSql = await fs.readFile(migrationPath, "utf-8");
  await sql.unsafe(migrationSql);
}

export async function getSiteContent(): Promise<SiteContent> {
  const rows = await sql<{ data: SiteContent }[]>`
    SELECT data FROM site_content WHERE id = 1
  `;

  if (rows.length === 0) {
    await upsertSiteContent(defaultSiteContent);
    return defaultSiteContent;
  }

  return rows[0].data;
}

export async function upsertSiteContent(content: SiteContent): Promise<SiteContent> {
  const rows = await sql<{ data: SiteContent }[]>`
    INSERT INTO site_content (id, data, updated_at)
    VALUES (1, ${sql.json(JSON.parse(JSON.stringify(content)))}, NOW())
    ON CONFLICT (id) DO UPDATE SET
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING data
  `;
  return rows[0].data;
}
