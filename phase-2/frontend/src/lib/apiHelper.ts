export const api = (path: string) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/g, "");
  return new URL(path.startsWith("/") ? path : `/${path}`, base).toString();
};