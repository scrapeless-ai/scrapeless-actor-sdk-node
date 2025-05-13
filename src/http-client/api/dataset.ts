import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type {
  IPagination,
  IDatasetListParams,
  IDatasetList,
  IPaginationParams,
  IStorageCreateData,
  IStorageCommonResponse,
} from "@/types";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function listDatasets(params: IDatasetListParams) {
  const res = await httpClient.request<IPagination<IDatasetList>>({
    url: "/dataset",
    method: "GET",
    params,
  });

  return res;
}

export async function createDataset(data: IStorageCreateData) {
  const res = await httpClient.request<IDatasetList>({
    url: "/dataset",
    method: "POST",
    data,
  });

  return res;
}

export async function updateDataset(datasetId: string, name: string) {
  const res = await httpClient.request<IDatasetList>({
    url: `/dataset/${datasetId}`,
    method: "PUT",
    data: { name },
  });

  return res;
}

export async function delDataset(datasetId: string) {
  const res = await httpClient.request<IStorageCommonResponse>({
    url: `/dataset/${datasetId}`,
    method: "DELETE",
  });

  return res;
}

export async function addItemsWithId<T extends object>(
  datasetId: string,
  items: Array<T>
) {
  const res = await httpClient.request<IStorageCommonResponse>({
    url: `/dataset/${datasetId}/items`,
    method: "POST",
    data: items,
  });

  return res;
}

export async function getItemsWithId<T>(
  datasetId: string,
  params: IPaginationParams
) {
  const res = await httpClient.request<IPagination<T>>({
    url: `/dataset/${datasetId}/items`,
    method: "GET",
    params,
  });

  return res;
}
