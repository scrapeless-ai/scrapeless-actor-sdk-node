import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type {
  IPaginationParams,
  IPagination,
  IQueueItem,
  IQueueCreateData,
  IQueueUpdateData,
  IQueuePushParams,
  IQueueCommonResponse,
  IQueueMessageItem,
} from "@/types";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function queueList(params: IPaginationParams) {
  const res = await httpClient.request<IPagination<IQueueItem>>({
    url: "/queue/queues",
    method: "GET",
    params,
  });

  return res;
}

export async function createQueue(data: IQueueCreateData) {
  const res = await httpClient.request<IQueueItem>({
    url: "/queue",
    method: "POST",
    data,
  });

  return res;
}

export async function queueGet(queueId: string, name: string) {
  const res = await httpClient.request<IQueueItem>({
    url: `/queue`,
    method: "GET",
    params: { id: queueId, name },
  });

  return res;
}

export async function queueUpdate(queueId: string, data: IQueueUpdateData) {
  const res = await httpClient.request<IQueueItem>({
    url: `/queue/${queueId}`,
    method: "PUT",
    data,
  });

  return res;
}

export async function queueDelete(queueId: string) {
  const res = await httpClient.request<IQueueCommonResponse>({
    url: `/queue/${queueId}`,
    method: "DELETE",
  });

  return res;
}

export async function createMessage(queueId: string, data: IQueuePushParams) {
  const res = await httpClient.request<{ msg_id: string }>({
    url: `/queue/${queueId}/push`,
    method: "POST",
    data,
  });

  return res;
}

export async function queueAckMessage(queueId: string, msgId: string) {
  const res = await httpClient.request<IQueueCommonResponse>({
    url: `/queue/${queueId}/ack/${msgId}`,
    method: "POST",
  });

  return res;
}

export async function queueGetMessage(queueId: string) {
  const res = await httpClient.request<IQueueMessageItem[]>({
    url: `/queue/${queueId}/pull`,
    method: "GET",
  });

  return res;
}
