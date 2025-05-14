import { getEnv } from "@/env";

import type { ICreateBrowser, ScrapelessBrowser } from "@/types";

export class Browser implements ScrapelessBrowser {
  create(data: ICreateBrowser) {
    const baseURL = getEnv("EnvScrapelessBrowserHost");
    const token = getEnv("EnvToken");
    const params: {
      token: string;
      session_ttl?: string;
      proxy_country?: string;
      fingerprint?: string;
      proxy_url?: string;
      session_recording?: string;
    } = {
      token,
    };

    if (data.session_ttl) {
      params.session_ttl = String(data.session_ttl);
    }

    if (data.proxy_country) {
      params.proxy_country = data.proxy_country;
    }

    if (data.fingerprint) {
      params.fingerprint = JSON.stringify(data.fingerprint);
    }

    if (data.proxy_url) {
      params.proxy_url = data.proxy_url;
    }

    if (data.session_recording) {
      params.session_recording = String(data.session_recording);
    }

    const search = new URLSearchParams(params);

    return {
      devtoolsUrl: `ws://${baseURL}/browser?${search.toString()}`,
    };
  }
}
