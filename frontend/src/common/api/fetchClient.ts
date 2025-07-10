const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export async function fetchClient(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  return fetch(url, options);
}
