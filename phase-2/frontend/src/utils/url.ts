/**
 * Utility functions for URL construction and normalization
 */

/**
 * Joins URL parts and ensures proper formatting without double slashes
 * @param baseUrl The base URL (e.g., 'https://api.example.com/')
 * @param path The path to append (e.g., '/users/profile')
 * @returns Properly formatted URL (e.g., 'https://api.example.com/users/profile')
 */
export function joinUrl(baseUrl: string, path: string): string {
  // Normalize base URL: trim whitespace and remove trailing slash
  let normalizedBaseUrl = baseUrl.trim();
  if (normalizedBaseUrl.endsWith('/')) {
    normalizedBaseUrl = normalizedBaseUrl.slice(0, -1);
  }

  // Normalize path: remove leading slashes (we'll add exactly one)
  let normalizedPath = path.replace(/^\/+/, '/');

  // Ensure path starts with a slash
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  return normalizedBaseUrl + normalizedPath;
}

/**
 * Creates a normalized API URL by joining base URL with endpoint
 * @param baseUrl Base API URL
 * @param endpoint API endpoint path
 * @returns Properly formatted API URL
 */
export function createApiUrl(baseUrl: string, endpoint: string): string {
  return joinUrl(baseUrl, endpoint);
}