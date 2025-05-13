import { createTask, getTaskResult } from "@/http-client/api/captcha";
import { sleep } from "@/utils/time";

import type { ICreateCaptcha, ScrapelessCaptcha } from "@/types";

export class Captcha implements ScrapelessCaptcha {
  constructor() {}

  async captchaCreate(data: ICreateCaptcha) {
    return await createTask(data);
  }

  async captchaResultGet(taskId: string) {
    return await getTaskResult(taskId);
  }

  async captchaSolver(data: ICreateCaptcha) {
    const task = await this.captchaCreate(data);
    const result = await this.captchaResultGet(task.taskId);

    if (result.success) return result;

    while (true) {
      await sleep(1000);
      const result = await this.captchaResultGet(task.taskId);
      if (result.success) {
        return result;
      }
    }
  }
}
