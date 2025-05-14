import { Storage } from "@/storage";
import { Captcha } from "@/captcha";
import { Browser } from "@/browser";
import { Proxy } from "@/proxy";
import { Runner } from "@/runner";
import { getEnv } from "@/env";

import type {
  ScrapelessActor,
  ScrapelessCaptcha,
  ScrapelessBrowser,
  ScrapelessProxy,
  ScrapelessRunner,
} from "@/types";

export default class Actor implements ScrapelessActor {
  storage: Storage;
  captcha: ScrapelessCaptcha;
  browser: ScrapelessBrowser;
  proxy: ScrapelessProxy;
  runner: ScrapelessRunner;

  constructor() {
    // Initialize the actor
    this.storage = new Storage();
    this.captcha = new Captcha();
    this.browser = new Browser();
    this.proxy = new Proxy();
    this.runner = new Runner();
  }

  input() {
    return getEnv("EnvInput");
  }
}
