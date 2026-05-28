// Local dev default; override in production with REACT_APP_API_URL.
const DEFAULT_API_BASE_URL = "http://localhost:5000";

export function getApiBaseUrl() {
  const envUrl = process.env.REACT_APP_API_URL;
  return (envUrl && envUrl.trim()) || DEFAULT_API_BASE_URL;
}

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

async function readJsonSafely(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function apiRequest<TResponse>(
  path: string,
  options?: RequestInit & { token?: string | null },
): Promise<TResponse> {
  const baseUrl = getApiBaseUrl().replace(/\/+$/, "");
  const urlPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${urlPath}`;

  const headers = new Headers(options?.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (options?.token) headers.set("Authorization", `Bearer ${options.token}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const payload = await readJsonSafely(response);

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload && typeof (payload as any).message === "string"
        ? (payload as any).message
        : `Request failed with status ${response.status}`) || "Request failed";
    const error: ApiError = { message, status: response.status, details: payload };
    throw error;
  }

  return payload as TResponse;
}

