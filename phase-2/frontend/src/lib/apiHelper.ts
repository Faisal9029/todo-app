export const api = (path) =>
  new URL(
    path.startsWith("/") ? path : `/${path}`,
    process.env.NEXT_PUBLIC_API_BASE_URL
  ).toString();