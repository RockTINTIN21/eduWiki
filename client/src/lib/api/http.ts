import { AUTH_ENDPOINTS } from "@/lib/api/endpoints/auth.endpoints";
import { Code } from "@/lib/api/error-messages";
import {API_URL} from "@/lib/constants";

export type Err = {
  code: Code;
  errors?: {
    field: string;
    code: Code;
  }[];
};

export class ApiError<TFields extends string = string> extends Error {
  code: Code;
  errors?: {
    field: TFields;
    code: Code;
  }[];
  constructor(code: Code, errors?: { field: TFields; code: Code }[]) {
    super();
    this.code = code;
    this.errors = errors;
  }
}

const fetchWrapperResponse = async <T>(res: Response) => {
  const contentType = res.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");

	const data = isJson
		? await res.json().catch(() => undefined)
		: await res.text().catch(() => "");

	return data as T;
};

const fetchErrorHandler = async <T>(
	res: Response,
	path: string,
	init?: RequestInit,
	body?: BodyInit | null,
) => {
	if (!res.ok) {

		if (res.status === 401 && path !== AUTH_ENDPOINTS.refresh) {
			const refreshRes = await fetch(`${API_URL}${AUTH_ENDPOINTS.refresh}`, {
				credentials: "include",
			});

			if (refreshRes.ok) {
				const retryFetchRes = await fetch(`${API_URL}${path}`, {
					...init,
					body,
					credentials: "include",
				});

				return fetchWrapperResponse<T>(retryFetchRes);
			} else {
        throw new ApiError(Code.ERROR_UPDATE_TOKEN);
			}
		} else {
      const err: Err = JSON.parse(await res.text());
      if (res.status === 500) {
        throw new ApiError(Code.INTERNAL_ERROR);
      } else {
        throw new ApiError(err.code, err.errors);
      }
		}
	} else {
		return fetchWrapperResponse<T>(res);
	}
};

export const http = {
	post: async <T>(
		path: string,
		init?: Omit<RequestInit, "method"> & { json?: unknown },
	) => {

    const headers = new Headers(init?.headers);
		let body = init?.body;
		if (init && "json" in init) {
      headers.set("Content-Type", "application/json");
			body = JSON.stringify(init.json);
		}

		const res = await fetch(`${API_URL}${path}`, {
			...init,
			body,
			method: "POST",
			credentials: "include",
      headers,
		});

		return await fetchErrorHandler<T>(res, path, init, body);

	},

	get: async <T>(path: string, init?: Omit<RequestInit, "body" | "method">) => {
    const headers = new Headers(init?.headers);
		const res = await fetch(`${API_URL}${path}`, {
			...init,
			credentials: "include",
      headers
		});

    return await fetchErrorHandler<T>(res, path, init);
	},
};
