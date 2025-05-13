import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

import type { ICreateCaptchaResponse, IGetCaptchaResult } from "@/types";

const baseURL = getEnv("EnvScrapelessCaptchaHost");
const httpClient = new HttpClient(baseURL);

export async function createTask(data: any) {
  return httpClient.request<ICreateCaptchaResponse>({
    url: "/createTask",
    method: "POST",
    data,
  });
}

export async function getTaskResult(taskId: string) {
  return httpClient.request<IGetCaptchaResult>({
    url: `/getTaskResult/${taskId}`,
    method: "GET",
  });
}
