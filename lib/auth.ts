import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

// cookies() is async in Next.js 14 App Router
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === process.env.ADMIN_PASSWORD;
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
