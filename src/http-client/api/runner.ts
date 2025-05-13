import { HttpClient } from "@/http-client/http";
import { getEnv } from "@/env";

const baseURL = getEnv("EnvScrapelessApiHost");
const httpClient = new HttpClient(baseURL);

export async function abortRunner(actorId: string, runId: string) {
  const res = await httpClient.request({
    url: `/actors/${actorId}/runs/${runId}`,
    method: "DELETE",
  });

  return res;
}
