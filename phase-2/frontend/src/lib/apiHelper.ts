// src/lib/apiHelper.ts

/**
 * Standardized API URL builder
 * - Prevents double slashes
 * - Removes trailing slashes & newlines from base URL
 * - Works with /path, path, //path
 * - Production safe (Railway + Vercel)
 */

export const api = (path: string): string => {
  const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!rawBase) {
    throw new Error("❌ NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  // Clean base URL and path, then join with exactly one slash
  const cleanBase = rawBase
    .trim()
    .replace(/\n/g, "")
    .replace(/\/+$/, "");   // remove all trailing slashes

  const cleanPath = path
    .trim()
    .replace(/^\/+/, "");   // remove all leading slashes

  // Combine base and path with exactly one slash between them
  return `${cleanBase}/${cleanPath}`;
};
