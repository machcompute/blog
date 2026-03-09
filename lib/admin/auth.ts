import { createHmac } from "crypto";

const SESSION_COOKIE = "admin_session";
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getPassword() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD is not set");
  return pw;
}

function hmac(data: string): string {
  return createHmac("sha256", getPassword()).update(data).digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === getPassword();
}

export function createSession(): string {
  const ts = Date.now().toString();
  return `${ts}.${hmac(ts)}`;
}

export function verifySession(cookie: string): boolean {
  const dot = cookie.indexOf(".");
  if (dot === -1) return false;
  const ts = cookie.slice(0, dot);
  const sig = cookie.slice(dot + 1);
  if (hmac(ts) !== sig) return false;
  const age = (Date.now() - parseInt(ts, 10)) / 1000;
  return age < MAX_AGE;
}

export { SESSION_COOKIE, MAX_AGE };

export function requireAuth(cookies: { get(name: string): { value: string } | undefined }): void {
  const session = cookies.get(SESSION_COOKIE)?.value;
  if (!session || !verifySession(session)) {
    throw new AuthError();
  }
}

export class AuthError extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: MAX_AGE,
};
