import { getEnv } from "@/env";
import { formatErrorCode } from "@/utils/format";

export type QueryParams = Record<string, any>;

export type RequestData =
  | Record<string, any>
  | FormData
  | URLSearchParams
  | ArrayBuffer
  | Blob
  | string;

export interface IHttpRequestOption {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  data?: RequestData;
  params?: QueryParams;
  download?: boolean;
}

export interface IHttpResponse<T> {
  data: T;
  err: boolean;
  msg: string;
  code: number;
  traceId?: string;
}

export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(option: IHttpRequestOption): Promise<T> {
    let url = this.baseURL + option.url;
    const requestOptions: RequestInit = {
      method: option.method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getEnv("EnvXApiKey"),
      },
    };

    if (option.headers) {
      const headers = requestOptions.headers as Record<string, string>;
      Object.entries(option.headers).forEach(([key, value]) => {
        headers[key] = value;
      });
    }

    if (option.data) {
      requestOptions.body = JSON.stringify(option.data);
    }

    if (option.params) {
      const params = new URLSearchParams();
      Object.entries(option.params).forEach(([key, value]) => {
        let v = value;
        if (key === "page") {
          v = value <= 1 ? 1 : Math.ceil(value);
        }

        if (key === "pageSize") {
          v = value >= 100 ? 100 : Math.ceil(value) <= 1 ? 1 : Math.ceil(value);
        }
        params.append(key, String(v));
      });
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, requestOptions);

    if (option.download) {
      if (res.status !== 200) {
        const data = await res.json();
        const { errorCode, errorMessage } = formatErrorCode(
          data?.code || 500500,
          data?.msg
        );
        throw new Error(`${errorCode}: ${errorMessage}`);
      }
      const blob = await res.blob();
      return blob as unknown as T;
    }

    const data = await res.json();
    if (res.status !== 200 || data.err) {
      const { errorCode, errorMessage } = formatErrorCode(
        data?.code || 200200,
        data?.msg
      );
      throw new Error(`${errorCode}: ${errorMessage}`);
    }
    return data.data;
  }
}
