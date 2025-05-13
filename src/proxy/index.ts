import { getEnv } from "@/env";

import type { ICreateProxy, ScrapelessProxy } from "@/types";

export class Proxy implements ScrapelessProxy {
  proxy(proxy: ICreateProxy) {
    const token = getEnv("EnvToken");
    const baseURL = "http://CHANNEL-proxy.residential-country_";
    return `${baseURL}${proxy.country}-r_${proxy.sessionDuration}m-s_${proxy.sessionId}:${token}@${proxy.gateway}`;
  }
}
