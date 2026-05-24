import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { env } from "./env.js";
import { runMigrations, getSiteContent, upsertSiteContent, sql } from "./db.js";
import {
  authMiddleware,
  createAdminToken,
  verifyAdminPassword,
} from "./auth.js";
import { defaultSiteContent } from "../../shared/defaultSiteContent.js";
import type { SiteContent } from "../../shared/siteContent.js";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: env.corsOrigin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
  }),
);

app.get("/api/health", (c) => c.json({ ok: true }));

const loginSchema = z.object({
  password: z.string().min(1),
});

app.post("/api/auth/login", async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "Password is required" }, 400);
  }

  if (!verifyAdminPassword(parsed.data.password)) {
    return c.json({ error: "Invalid password" }, 401);
  }

  const token = await createAdminToken();
  return c.json({ token });
});

app.get("/api/site-content", async (c) => {
  const content = await getSiteContent();
  return c.json(content);
});

app.put("/api/site-content", authMiddleware, async (c) => {
  const body = (await c.req.json()) as SiteContent;
  const content = await upsertSiteContent(body);
  return c.json(content);
});

app.post("/api/site-content/reset", authMiddleware, async (c) => {
  const content = await upsertSiteContent(defaultSiteContent);
  return c.json(content);
});

async function bootstrap() {
  await runMigrations();
  console.log(`API listening on http://localhost:${env.port}`);
  serve({ fetch: app.fetch, port: env.port });
}

bootstrap().catch(async (err) => {
  console.error("Failed to start server:", err);
  await sql.end();
  process.exit(1);
});

process.on("SIGINT", async () => {
  await sql.end();
  process.exit(0);
});
