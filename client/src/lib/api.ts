import {store, useAppSelector, useAppStore} from "@/lib/store/store";
import {authSlice} from "@/lib/store/auth/auth.slice";
import {toast} from "sonner";
import {Code} from "@/lib/errorHandler/errorHandler";

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

export class ApiErrorOld extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

function normalizeMessage(payload: ApiErrorPayload | undefined): string {
  const msg = payload?.message;
  if (Array.isArray(msg)) return msg.join(", ");
  if (typeof msg === "string") return msg;
  return payload?.error || "Request failed";
}

// export async function apiFetch<T>(
//   path: string,
//   init?: RequestInit & { json?: unknown },
// ): Promise<T> {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
//
//   const headers = new Headers(init?.headers);
//
//   let body = init?.body;
//   if (init && "json" in init) {
//     headers.set("Content-Type", "application/json");
//     body = JSON.stringify(init.json);
//   }
//
//   const res = await fetch(`${baseUrl}${path}`, {
//     ...init,
//     headers,
//     body,
//     credentials: "include",
//   });
//
//   if (res.status === 204) return undefined as T;
//
//   const contentType = res.headers.get("content-type") || "";
//   const isJson = contentType.includes("application/json");
//
//   const data = isJson
//     ? await res.json().catch(() => undefined)
//     : await res.text().catch(() => "");
//
//   if (!res.ok) {
//     const payload = (isJson ? data : undefined) as ApiErrorPayload | undefined;
//     console.log("payload:",payload)
//     throw new ApiError(
//       res.status,
//       normalizeMessage(payload) || String(data),
//       payload,
//     );
//   }
//
//   return data as T;
// }


export async function apiGuardFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

  const headers = new Headers(init?.headers);

  let body = init?.body;
  if (init && "json" in init) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.json);
  }

  const state = store.getState();
  const token = authSlice.selectors.getAccessToken(state);

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
    credentials: "include",
  });

  if (res.status === 204) return undefined as T;

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data = isJson
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => "");

  if (!res.ok) {
    const payload = (isJson ? data : undefined) as ApiErrorPayload | undefined;
    throw new ApiErrorOld(
      res.status,
      normalizeMessage(payload) || String(data),
      payload,
    );
  }

  return data as T;
}












































export type Err = {
  code: Code;
  field: string;
}

export class ApiError<TField extends string = string> extends Error {
  code: Code;
  field: TField;
  constructor(code: Code, field: TField) {
    super();
    this.code = code;
    this.field = field;
  }

}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(init?.json),
    credentials: "include",
    ...init,
  })

  if(!res.ok){
    const err: Err = JSON.parse(await res.text());
    console.error(err)
    if(res.status === 500){
      toast.error('Внутренняя ошибка сервера, пожалуйста повторите попытку позже', {position: 'top-center'});
      console.error(err);
    }
    if (err){
      throw new ApiError(err.code, err.field)
    }

  }
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => "");

  return data as T;
}