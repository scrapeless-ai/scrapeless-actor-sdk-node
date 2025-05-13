import FormData from "form-data";
import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type {
  IObjectListParams,
  IObjectBucketsPagination,
  IObjectBucketItem,
  IObjectCreateData,
  IObjectCommonResponse,
  IObjectPaginationParams,
  IObjectBucketObjectItem,
  IObjectObjectsPagination,
  IObjectUploadResponse,
} from "@/types";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function objectListBuckets(params: IObjectListParams) {
  const res = await httpClient.request<
    IObjectBucketsPagination<IObjectBucketItem>
  >({
    url: "/object/buckets",
    method: "GET",
    params,
  });

  return res;
}

export async function objectCreateBucket(data: IObjectCreateData) {
  const res = await httpClient.request<IObjectBucketItem>({
    url: "/object/buckets",
    method: "POST",
    data,
  });

  return res;
}

export async function objectDeleteBucket(bucketId: string) {
  const res = await httpClient.request<IObjectCommonResponse>({
    url: `/object/buckets/${bucketId}`,
    method: "DELETE",
  });

  return res;
}

export async function objectGetBucket(bucketId: string) {
  const res = await httpClient.request<IObjectBucketItem>({
    url: `/object/buckets/${bucketId}`,
    method: "GET",
  });

  return res;
}

export async function objectList(
  bucketId: string,
  params: IObjectPaginationParams
) {
  const res = await httpClient.request<
    IObjectObjectsPagination<IObjectBucketObjectItem>
  >({
    url: `/object/buckets/${bucketId}/objects`,
    method: "GET",
    params,
  });

  return res;
}

export async function objectGetWithId(bucketId: string, objectId: string) {
  const res = await httpClient.request<Blob>({
    url: `/object/buckets/${bucketId}/${objectId}`,
    method: "GET",
    download: true,
  });

  return res;
}

export async function objectPutWithId(bucketId: string, data: FormData) {
  const res = await httpClient.request<IObjectUploadResponse>({
    url: `/object/buckets/${bucketId}/object`,
    method: "POST",
    data,
  });

  return res;
}

export async function objectDelete(bucketId: string, objectId: string) {
  const res = await httpClient.request<IObjectCommonResponse>({
    url: `/object/buckets/${bucketId}/${objectId}`,
    method: "DELETE",
  });

  return res;
}
