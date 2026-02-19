import {Code} from "@/lib/api/error-messages";

export const API_UPLOADS_URL = `${process.env.NEXT_PUBLIC_API_URL}/uploads`;
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

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

	// const state = store.getState();
  // console.log('state:', state)
	const res = await fetch(`${API_URL}${path}`, {
		...init,
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
};

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
	const headers = new Headers(init?.headers);

	if (init?.json) {
		headers.set("content-type", "application/json");
	}

  console.log('test')

	const res = await fetch(`${API_URL}${path}`, {
		headers: headers ? headers : {},
		body: init?.body ? init.body : JSON.stringify(init?.json),
		credentials: "include",
		...init,
	});

	if (!res.ok) {
		const err: Err = JSON.parse(await res.text());
		// console.error(err);
		// if (res.status === 500) {
		// 	toast.error(
		// 		"Внутренняя ошибка сервера, пожалуйста повторите попытку позже",
		// 		{ position: "top-center" },
		// 	);
		// 	// console.error(err);
		// }
		if (err?.code && err.field) {
			throw new ApiError(err.code, err.field);
		}
	}

	const contentType = res.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");
	const data = isJson
		? await res.json().catch(() => undefined)
		: await res.text().catch(() => "");

	return data as T;
}

export type NewErr = {
  code: Code;
  errors?: {
    field: string;
    code: Code;
  }[]
};


export class ApiNewError extends Error {
  code: Code;
  errors?: {
    field: string;
    code: Code;
  }[]
  constructor(code: Code, errors?: {field: string; code: Code}[]) {
    super();
    this.code = code;
    this.errors = errors;
    // this.message = message;
    // this.errors = errors;
  }
}

export async function apiNewFetch<T>(
  path: string,
  init?: RequestInit & { json?: unknown },
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.json) {
    headers.set("content-type", "application/json");
  }

  console.log('test')

  const res = await fetch(`${API_URL}${path}`, {
    headers: headers ? headers : {},
    body: init?.body ? init.body : JSON.stringify(init?.json),
    credentials: "include",
    ...init,
  });

  if (!res.ok) {
    const err: NewErr = JSON.parse(await res.text());
    // console.error(err);
    // if (res.status === 500) {
    // 	toast.error(
    // 		"Внутренняя ошибка сервера, пожалуйста повторите попытку позже",
    // 		{ position: "top-center" },
    // 	);
    // 	// console.error(err);
    // }
    console.error('err:', err)
    // throw new ApiNewError(err.code);
    if(res.status === 500){
      throw new ApiNewError(Code.UNKNOWN_ERROR);
    }else{
      throw new ApiNewError(err.code, err.errors);
    }

    // if (err?.code && err.field) {
    //   throw new ApiError(err.code, err.field);
    // }
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => "");

  return data as T;
}