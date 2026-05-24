import type { SiteContent } from "@shared/siteContent";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const ADMIN_TOKEN_KEY = "teambuild-admin-token";

export function getAdminToken(): string | null {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `Request failed (${res.status})`,
    );
  }

  return res.json() as Promise<T>;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  return request<SiteContent>("/api/site-content");
}

export async function saveSiteContent(
  content: SiteContent,
  token: string,
): Promise<SiteContent> {
  return request<SiteContent>("/api/site-content", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(content),
  });
}

export async function resetSiteContent(token: string): Promise<SiteContent> {
  return request<SiteContent>("/api/site-content/reset", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function loginAdmin(password: string): Promise<string> {
  const { token } = await request<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  return token;
}
