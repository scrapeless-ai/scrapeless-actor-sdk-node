import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type {
  ICreateActorData,
  ICreateActorResponse,
  IRunActorData,
  IRunActorResponse,
  IActorUpdateData,
  IActorBuildResponse,
  IPaginationParams,
  IPagination,
} from "@/types";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function createActor(data: ICreateActorData) {
  const res = await httpClient.request<ICreateActorResponse>({
    url: "/actors",
    method: "POST",
    data,
  });

  return res;
}

export async function run<T>(actorId: string, data: IRunActorData<T>) {
  const res = await httpClient.request<IRunActorResponse<T>>({
    url: `/actors/${actorId}/runs`,
    method: "POST",
    data,
  });

  return res;
}

export async function actorRun(actorId: string, runId: string) {
  const res = await httpClient.request<IRunActorResponse<any>>({
    url: `/actors/${actorId}/runs/${runId}`,
    method: "POST",
  });

  return res;
}

export async function abortRunningActor(actorId: string, runId: string) {
  const res = await httpClient.request<IRunActorResponse<any>>({
    url: `/actors/${actorId}/runs/${runId}`,
    method: "DELETE",
  });

  return res;
}

export async function updateActor(actorId: string, data: IActorUpdateData) {
  const res = await httpClient.request<ICreateActorResponse>({
    url: `/actors/${actorId}`,
    method: "PUT",
    data,
  });

  return res;
}

export async function buildActor(actorId: string) {
  const res = await httpClient.request<IActorBuildResponse>({
    url: `/actors/${actorId}/builds`,
    method: "POST",
  });

  return res;
}

export async function getActorBuildStatus(actorId: string, buildId: string) {
  const res = await httpClient.request<IActorBuildResponse>({
    url: `/actors/${actorId}/builds/${buildId}`,
    method: "GET",
  });

  return res;
}

export async function abortActorBuild(actorId: string, buildId: string) {
  const res = await httpClient.request<IActorBuildResponse>({
    url: `/actors/${actorId}/builds/${buildId}`,
    method: "DELETE",
  });

  return res;
}

export async function getActorRunList(
  actorId: string,
  params: IPaginationParams
) {
  const res = await httpClient.request<IPagination<IRunActorResponse<any>>>({
    url: `/actors/${actorId}/runs`,
    method: "GET",
    params,
  });

  return res;
}

export async function getActorRunStatus(actorId: string, runId: string) {
  const res = await httpClient.request<IRunActorResponse<any>>({
    url: `/actors/${actorId}/runs/${runId}`,
    method: "GET",
  });

  return res;
}
