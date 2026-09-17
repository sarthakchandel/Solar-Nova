import { useUserStore } from "@/store/use-user-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export interface ServiceResult<T = undefined> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

async function getHeaders(isMultipart = false): Promise<HeadersInit> {
  const headers: Record<string, string> = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  const token = useUserStore.getState().token;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function parseError(response: Response): Promise<string> {
  try {
    const text = await response.text();
    const obj = JSON.parse(text);
    return obj.messages?.[0] ?? obj.message ?? `Error ${response.status}: ${response.statusText}`;
  } catch {
    return `Error ${response.status}: ${response.statusText}`;
  }
}

export const apiClient = {
  async get<T>(endpoint: string): Promise<ServiceResult<T>> {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, { method: "GET", headers });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  async post<TBody, TResponse>(endpoint: string, body: TBody): Promise<ServiceResult<TResponse>> {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData, message: res.messages?.[0] ?? res.message };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  async put<TBody, TResponse>(endpoint: string, body: TBody): Promise<ServiceResult<TResponse>> {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData, message: res.messages?.[0] ?? res.message };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  async delete<TResponse>(endpoint: string): Promise<ServiceResult<TResponse>> {
    try {
      const headers = await getHeaders();
      const response = await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE", headers });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData, message: res.messages?.[0] ?? res.message };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  async postMultipart<TResponse>(endpoint: string, formData: FormData): Promise<ServiceResult<TResponse>> {
    try {
      const headers = await getHeaders(true);
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData, message: res.messages?.[0] ?? res.message };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  },

  async putMultipart<TResponse>(endpoint: string, formData: FormData): Promise<ServiceResult<TResponse>> {
    try {
      const headers = await getHeaders(true);
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: formData,
      });
      if (!response.ok) return { success: false, error: await parseError(response) };
      
      const res = await response.json();
      if (res.succeeded === false || res.success === false) {
        return { success: false, error: res.messages?.[0] ?? "API Error" };
      }
      
      const extractedData = res.data !== undefined ? res.data : res;
      return { success: true, data: extractedData, message: res.messages?.[0] ?? res.message };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Network error" };
    }
  }
};
