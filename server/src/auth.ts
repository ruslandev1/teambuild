import { SignJWT, jwtVerify } from "jose";
import type { Context, Next } from "hono";
import { env } from "./env.js";

const TOKEN_KEY = "teambuild-admin";
const encoder = new TextEncoder();
const secret = () => encoder.encode(env.jwtSecret);

export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(TOKEN_KEY)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.sub === TOKEN_KEY && payload.role === "admin";
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  return password === env.adminPassword;
}

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !(await verifyAdminToken(token))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
}
