import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type {
  IPagination,
  IPaginationParams,
  IKVNamespaceItem,
  IStorageCreateData,
  IKVCommonResponse,
  IKVListItem,
  IKVValueData,
} from "@/types";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function listNamespaces(params: IPaginationParams) {
  const res = await httpClient.request<IPagination<IKVNamespaceItem>>({
    url: "/kv/namespaces",
    method: "GET",
    params,
  });

  return res;
}

export async function createNamespace(data: IStorageCreateData) {
  const res = await httpClient.request<IKVNamespaceItem>({
    url: "/kv/namespaces",
    method: "POST",
    data,
  });

  return res;
}

export async function getNamespace(namespaceId: string) {
  const res = await httpClient.request<IKVNamespaceItem>({
    url: `/kv/${namespaceId}`,
    method: "GET",
  });

  return res;
}

export async function delNamespace(namespaceId: string) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}`,
    method: "DELETE",
  });

  return res;
}

export async function renameNamespace(namespaceId: string, name: string) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}/rename`,
    method: "PUT",
    data: { name },
  });

  return res;
}

export async function listKeys(
  namespaceId: string,
  params: Omit<IPaginationParams, "desc">
) {
  const res = await httpClient.request<IPagination<IKVListItem>>({
    url: `/kv/${namespaceId}/keys`,
    method: "GET",
    params,
  });

  return res;
}

export async function setValueWithId(namespaceId: string, data: IKVValueData) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}/key`,
    method: "PUT",
    data,
  });

  return res;
}

export async function delValue(namespaceId: string, key: string) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}/${key}`,
    method: "DELETE",
  });

  return res;
}

export async function getValueWithId(namespaceId: string, key: string) {
  const res = await httpClient.request<string>({
    url: `/kv/${namespaceId}/${key}`,
    method: "GET",
  });

  return res;
}

export async function bulkSetValue(namespaceId: string, data: IKVValueData[]) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}/bulk`,
    method: "POST",
    data: {
      Items: data,
    },
  });

  return res;
}

export async function bulkDelValue(namespaceId: string, keys: string[]) {
  const res = await httpClient.request<IKVCommonResponse>({
    url: `/kv/${namespaceId}/bulk`,
    method: "DELETE",
    data: {
      keys,
    },
  });

  return res;
}
