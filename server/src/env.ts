import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3001),
  databaseUrl: required("DATABASE_URL"),
  adminPassword: process.env.ADMIN_PASSWORD ?? "teambuild-admin",
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
