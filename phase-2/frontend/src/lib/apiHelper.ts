export const api = (path: string) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/g, "") || 'http://localhost:8000';
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path; // Remove leading slash if exists
  return `${base}/${normalizedPath}`;
};