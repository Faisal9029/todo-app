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

  // Clean base URL
  const base = rawBase
    .trim()
    .replace(/\n/g, "")     // remove newline
    .replace(/\/+$/g, "");  // remove trailing slashes

  // Clean path
  const cleanPath = path
    .trim()
    .replace(/^\/+/g, "");  // remove leading slashes

  return `${base}/${cleanPath}`;
};
